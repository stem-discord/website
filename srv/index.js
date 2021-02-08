// entry file

const express = require(`express`);
const path = require(`path`);
const morgan = require(`morgan`);
const fs = require(`fs`);
const session = require(`express-session`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const mongoose = require(`mongoose`);
const MongoDBSession = require(`connect-mongodb-session`)(session);
const discordBot = require(`${__dirname}/discordBot/bot.js`);
const fetch = require(`node-fetch`);
const getRawBody = require(`raw-body`);
const contentType = require(`content-type`);
const stemDiscordServerDb = require(`${__dirname}/stemDiscord`);


require(`dotenv`).config({ path: `../.env` });

console.log(`running node ${process.version}`);

const imageUploadOptions = {
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  //https://stackoverflow.com/questions/35050071/cant-get-multer-filefilter-error-handling-to-work
  //https://github.com/expressjs/multer
  // TODO: cant get this shit to work with other stuff
  // fileFilter: function (req, file, cb) {
  //   console.log(`called`);
  //   try {
  //     if (!file.mimeType) {
  //       return cb(null, false,
  //         new Error(`mimeType not provided what how does this even happen`));
  //     } 
  //     if (!file.mimetype.startsWith(`image`)) {
  //       return req.res.status(400)
  //         .json({ message: `not an image`});
  //     }
  //     // doesnt work
  //     // if (file.size > 10 * 1024 * 1024) {
  //     //   // reject file
  //     //   return cb(null, false, new Error(`file is too big`));
  //     // }
  //   } catch (e) {
  //     console.error(e);
  //     return req.res.status(500).json({ message: `internal server error` });
  //   }
  // },
};

// TODO: add db for storage object here
// https://github.com/stream-utils/raw-body
// apparently, having a global limit sounds good
const imageUpload = multer(imageUploadOptions);
// import socketIO from "socket.io";

const upload = multer();

// constants
const MONGO = {
  session: `session`,
  users: `Users`,
  memes: `Memes`,
};


const {
  COOKIE_SECRET = `secret`,
  MONGODB_URI,
  MONGODB_URI_AUTH, // with admin credientials on the connection string itself
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  HOST_BASE,
  DB_USER,
  DB_PASS,
  DB_AUTHSOURCE,
} = process.env;

// mongoose setup
if (!MONGODB_URI) {
  console.error(`mongodb uri is not provided`);
  process.exit(1);
}

let authObj = {};
if (DB_USER && DB_PASS) {
  authObj = {
    authSource: `admin`,
    user: DB_USER,
    pass: DB_PASS,
  };
}
// cookies
const store = new MongoDBSession({
  uri: `${MONGODB_URI_AUTH}/${MONGO.session}`,
  collection: `cookies`,
  connectionOptions:{
    authSource: `${DB_AUTHSOURCE}`,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
});


function connectionFactory(dbId) {
  return mongoose.createConnection(`${MONGODB_URI}/${dbId}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    ...authObj,
  });
}

const cookieSession = connectionFactory(MONGO.session);
const userDb = connectionFactory(MONGO.users);
const memeDb = connectionFactory(MONGO.memes);

const {
  UserSchema, 
  CookieSchema,
  MemeSchema,
} = require(`${__dirname}/db`);

// finally fixed everything
// TODO: soft code this
const CookieModel = cookieSession.model(MONGO.session, CookieSchema, `cookies`);
const UserModel = userDb.model(MONGO.users, UserSchema, `users`);
const MemeModel = memeDb.model(MONGO.memes, MemeSchema, `memes`);

// https redirect is done on nginx
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, `access.log`),
  { flags: `a` },
);
module.exports = (app) => {
  // form parsers
  app.use(bodyParser.urlencoded({extended: true}));

  // cookies 🍪
  app.use(session({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  }));

  // logs
  app.use(morgan(`combined`, { stream: accessLogStream }));

  // TODO use this somewhere else
  // validate filesize
  // https://github.com/stream-utils/raw-body#simple-express-example
  // this was the only thing that worked tbh
  // app.post(`*`, (req, res, next) => {
  //   if (!req.headers[`content-type`]) {
  //     return res.status(500).json({ message: `content-type is missing`});
  //   }
  //   getRawBody(req, {
  //     length: req.headers[`content-length`],
  //     limit: `10mb`,
  //     encoding: contentType.parse(req).parameters.charset,
  //   }).then().catch(e => {
  //     if (e.type === `entity.too.large`) {
  //       const ip = 
  //       req.headers[`x-forwarded-for`] || req.connection.remoteAddress;
  //       console.log(`${ip} attempted to send a file over the limit`);
  //       return res.status(500).json({ message: `entity too large` });
  //     }
  //   }).finally(() => {
  //     next();
  //   });
  // });

  // api
  app.use(express.json());
  const apiApp = (() => {
    const app = express();
    app.use(express.json());

    app.get(`/`, (req, res) => {
      res.json({message: `OK`});
    });

    // middleware for entire meme query
    async function getMemes(req, res, next) {
      let memes = [];
      try {
        // FIXME: this
        const { 
          ownerId,
          memeId,
        } = req.query;
        // const newMeme = new MemeModal({
        //   ownerId: `341446613056880641`,
        // });
        // await newMeme.save();
        memes = await MemeModel.find({ownerId, _id: memeId}).lean();
      } catch (e) {
        return res.status(500).json({ message: e.message });
      }
      res.memes = memes;
      next();
    }

    // middleware for single meme
    async function getMeme(req, res, next) {
      let meme;
      try {
        if (!req.params.id) 
          return res.status(400).json({ message: `no meme id provided`});
        meme = await MemeModel.findById(req.params.id);
        if (meme === null) {
          return res.status(404).json({ message: `no entry found` });
        }
      } catch (e) {
        return res.status(500).json({ message: e.message});
      }
      res.meme = meme;
      next();
    }

    app.get(`/memes`, getMemes, (req, res) => {
      res.json({ memes: res.memes });
    });

    app.get(`/meme/:id`, getMeme, (req, res) => {
      res.json(res.meme);
    });

    //TODO: soft code this
    const disabledModule = (() => {
      const app = express();
      app.get(`/*`, (req, res) => {
        res.status(503);
      });
      return app;
    });
    if (stemDiscordServerDb.expressApi) {
      console.log(`stem discord db api for express`);
      app.use(`/stem-discord`, 
        stemDiscordServerDb.expressApi ? 
          stemDiscordServerDb.expressApi :
          disabledModule);
    }

    app.get(`*`, (req, res) => {
      res.status(404).json({ error: `invalid end point`});
    });

    if (!process.env.PROD) {
      app.post(`/media`, imageUpload.single(`file`), async (req, res) => {
        try {
          console.log(req.file);
          const url = await discordBot.uploadFile(
            req.file.buffer,
            req.file.originalname,
          );
          console.log(url);
          res.status(201).json({message: `OK`});
        } catch (e) {
          res.status(500).json({message: e.message});
        }
        return;
      });
    }

    return app;
  })();
  app.use(`/api`, apiApp);

  app.post(`/meme`, 
    upload.fields(
      [{ name: `meme-title`, maxCount: 1}, { name: `meme`, maxCount: 1}],
    ), 
    async (req, res) => {
      // add session id validation
      // post it to a discord database channel and retrieve url
      
      let q = await UserModel.findOne({ sessionId: req.session.id});
      if (!q) {
        // user doesnt exist
        res.status(400).json({ message: `login required go to /login` });
        return;
      }
      // the user must be in the stem guild
      if (!(await discordBot.guilds()).first().member(q.discordUserObj.id)) {
        return res.status(403)
          .json(
            { message: `You must be in the stem server to do this action!`},
          );
      }
      // console.log(req.body);
      // console.log(req.files);
      /**{
        fieldname: 'meme',
        originalname: 'kill me.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        buffer: <Buffer ...>,
        size: 10135
      } */
      // example file response
      if (!req.body[`meme-title`]) {
        return res.status(400).json({ message: `meme title is missing!` });
      }
      if (!req.files[`meme`]) {
        return res.status(400).json({ message: `meme image is missing!` });
      }
      let url;
      try {
        let title = req.body[`meme-title`];
        // if file doesnt have extension
        if (!title.match(/\.\S+$/)) {
          // add the original extension
          const m = req.files[`meme`][0].originalname.match(/\.\S+/);
          title += m ? m[0] : `.png`;
        }
        const message = `${
          q.discordUserObj.username
        } <@${
          q.discordUserObj.id
        }> sent this via form submission`;
        url = await discordBot.uploadFile(
          req.files[`meme`][0].buffer, 
          title,
          {
            message,
            ping: true,
          },
        );
        console.log(url);
      } catch (e) {
        console.log(e);
        return res.status(500).json({ message: `internal server error` });
      } 
      res.status(200).json({message: `OK`});
    });

  // discord login
  app.get(`/login`, async (req, res, next) => {
    // add code that checks if the session already has a token
    let q = await UserModel.findOne({ sessionId: req.session.id});
    if (q) {
      // user exists
      if (q.discordId) {
        console.log(`already loggin to discord`);
        res.redirect(`/`);
        return;
      }
    }
    // TODO: split this into a separate file
    const scopes = [`identify`];
    if (!req.query.code) {
      const uri = `${HOST_BASE}/login`;

      res.redirect(
        `https://discord.com/api/oauth2/authorize?client_id=${
          DISCORD_CLIENT_ID
        }&redirect_uri=${
          encodeURIComponent(uri)
        }&response_type=code&scope=${
          encodeURIComponent(scopes.join(` `))
        }`);
      return;
    }
    
    // the user has a code query
    console.log(`processing request ${req.query.code} to discord`);
    const payload = {
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: `authorization_code`,
      code: req.query.code,

      redirect_uri: `${HOST_BASE}/login`,
    };
    const headers = {
      "Content-Type": `application/x-www-form-urlencoded`,
    };
    const response = await fetch(`https://discord.com/api/oauth2/token`, {
      method: `POST`,
      body: new URLSearchParams(payload),
      headers,
    }).then(v => v.json());
    console.log(response);
    if (response.error || !response.access_token) {
      res.send(`invalid token or internal server error :(`);
      return;
    } 
    const rscopes = response.scope.split(` `);
    if (!scopes.every(v => rscopes.includes(v))) {
      res.send(`scope mismatch. did you edit the url?`);
      return;
    }
    const accessToken = response.access_token;
    fetch(`https://discord.com/api/users/@me`, {
      headers: {
        authorization: `${response.token_type} ${response.access_token}`,
      },
    }).then( async userInfo => {
      userInfo = await userInfo.json();
      // if user info already exists, welcome back
      console.log(userInfo);
      const q = await UserModel.findOne({
        discordId: userInfo.id,
      });
     
      if (q === null) {
        // new user
        const newUser = new UserModel({
          discordId: userInfo.id,
          discordUserObj: userInfo,
          accessToken,
          sessionId: req.session.id,
        });
        newUser.save();
        console.log(`new user`);
      } else {
        // returning user
        // update their information
        q.discordUserObj = userInfo;
        q.accessToken = accessToken,
        q.sessionId = req.session.id;
        await q.save();
        console.log(`this user exists updated session information`);
      }
    });
    // redirect to home
    req.session.discord = true;
    res.redirect(`/`);
  }); 

  // vue view
  app.use(require(`connect-history-api-fallback`)());

  // // vue output
  // app.set(`views`, `dist`);
  // app.set(`view engine`, `html`);
  
  // TODO: i was originally going to use views instead of static but for 
  // some reason i cant get views to work and the below works 
  // just fine idk maybe ill fix it when im better at express or smth
  app.use(express.static(`dist`));

  
  // app.post('/bar', (req, res) => {
  //   res.json(req.body);
  // });
  //
  // optional support for socket.io
  //
  // let io = socketIO(http);
  // io.on("connection", client => {
  //   client.on("message", function(data) {
  //     // do something
  //   });
  //   client.emit("message", "Welcome");
  // });
};
