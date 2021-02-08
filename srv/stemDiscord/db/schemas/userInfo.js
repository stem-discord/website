const mongoose = require(`mongoose`);
const userInfo = new mongoose.Schema({
  server: String,
  user_id: String,
  stats: {
    questions: { type: Number, default: 0 },
    thanked: { type: Number, default: 0 },
    timed_thank: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    dailyStreak: {
      lastTimestamp: { type: Date, default: undefined },
      streak: { type: Number, default: 0 },
      bestStreak: { type: Number, default: 0 },
      lastStreak: { type: Number, default: undefined },
    },
  },
  thanked: [
    {
      day: Date,
      count: Number,
    },
  ],
  roles: [],
  onlineOnly: { type: Boolean, default: false },
});

module.exports = userInfo;
