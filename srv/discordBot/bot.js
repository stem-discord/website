// integrated with the backend itself
const Discord = require(`discord.js`);
const { Client } = Discord;
require(`dotenv`).config({ path: `../.env` });

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

function uploadFile() {

}

module.exports = {
  uploadFile,
};