const mongoose = require(`mongoose`);
const thankedLog = mongoose.Schema({
  server: {type: String, index: true},
  user_id: {type: String, index: true},
  userInfo: {type: mongoose.Schema.Types.ObjectId, ref: `userInfo`},
  thankedLog: {type: mongoose.Schema.Types.ObjectId, ref: `thankedLog`},
});

module.exports = thankedLog;
