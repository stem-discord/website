const { Schema } = require(`mongoose`);

const userSchema = new Schema({
  discordId: {
    type: String,
    unique: true,
  },
  discordUserObj: {
    type: Object,
  },
  accessToken: {
    type: String,
  },
  sessionId: {
    type: String,
  },
});

module.exports = userSchema;