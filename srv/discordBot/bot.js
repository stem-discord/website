// integrated with the backend itself
const Discord = require(`discord.js`);
const { Client } = Discord;
require(`dotenv`).config({ path: `${__dirname}/.env` });

let clientLogin;
const login = new Promise(r => {
  clientLogin = r;
});

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

async function uploadFile() {
  await login;
}

if (!process.env.DISCORD_BOT_TOKEN)
  console.error(`No discord bot token provided`);
client.login(process.env.DISCORD_BOT_TOKEN).then(clientLogin);

module.exports = {
  uploadFile,
};