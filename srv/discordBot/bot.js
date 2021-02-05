// integrated with the backend itself
const Discord = require(`discord.js`);
const { Client } = Discord;
require(`dotenv`).config({ path: `${__dirname}/.env` });

let clientLogin;
const login = new Promise(r => {
  clientLogin = r;
});

const {
  DB_CHANNEL,
  DISCORD_BOT_TOKEN,
} = process.env;

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

const client = new Client({
  partials: [`MESSAGE`, `CHANNEL`, `REACTION`],
  disableMentions: `all`,
});

const pingEveryoneRoleOption = {
  disableMentions: `none`,
};

client.on(`message`, async message => {
  // write stuff
});

async function uploadFile(file, name, options) {
  if (!file) throw new Error(`file is nullish`);
  await login;
  const fileArgs = [];
  const { message = undefined, ping = undefined } = options ?? {};
  if (message) fileArgs.push(message);
  fileArgs.push(
    { 
      disableMentions: ping ? `none` : undefined,
      files: [new Discord.MessageAttachment(file, name)],
    });
  return client.channels.cache.get(DB_CHANNEL)
    .send(...fileArgs)
    .then(m => {
      return m.attachments.first().url;
    }).catch(e => { throw e;});
}
if (!DB_CHANNEL)
  if (!DISCORD_BOT_TOKEN)
    console.error(`No discord bot token provided`);
client.login(DISCORD_BOT_TOKEN)
  .then(() => {
    clientLogin(); 
    console.log(`logged in as ${client.user.username}`);
  });

module.exports = {
  uploadFile,
};