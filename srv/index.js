const express = require(`express`);
const path = require(`path`);
const morgan = require(`morgan`);
const fs = require(`fs`);
const session = require(`express-session`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
// TODO: add db for storage object here
const upload = multer();
require(`dotenv`).config({ path: `../.env` });
// import socketIO from "socket.io";

// simple db handler
class JSONFileHandler {
  constructor(filePath) {
    this.filePath = filePath;
    try {
      this.obj = require(filePath);
    } catch (error) {
      console.log(`error reading the json file`, error);
      this.error = true;
    }
  }
  save() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.obj, null, ` `), {
      encoding: `utf8`,
    });
  }
}

const database = new JSONFileHandler(`/database.json`);

const {
  COOKIE_SECRET,
} = process.env;

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
    saveUninitialized: true,
  }));

  // logs
  app.use(morgan(`combined`, { stream: accessLogStream }));

  // api
  app.use(express.json());
  app.get(`/api`, (req, res) => {
    res.json({msg: `works`});
  });

  app.post(`/meme`, upload.single(`meme`), (req, res) => {
    // add session id validation
    // post it to a discord database channel and retrieve url
  });

  // discord login
  app.get(`/login`, (req, res) => {
    // TODO: split this into a separate file
    res.json({msg: `l`});
  }); 

  // vue view
  app.use(require(`connect-history-api-fallback`)());

  // // vue output
  // app.set(`views`, `dist`);
  // app.set(`view engine`, `html`);
  
  // TODO: i was originally going to use views instead of static but for some reason i cant get views to work and the below works just fine idk maybe ill fix it when im better at express or smth
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
