const mongoose = require(`mongoose`);
const thankedLog = mongoose.Schema({
  server: {type: String, index: true},
  user_id: {type: String, index: true},
  monthly: {type: Number, default: 0, index: true},
  yearly: {type: Number, default: 0, index: true},
  weekly_vc: {type: Number, default: 0, index: true},
  weekly_study_vc: {type: Number, default: 0, index: true},
  thankedYearly: [{
    day: { type: Date, default: Date.now},
    count: Number,
  }],
  thankedMonthly: [{
    day: { type: Date, default: Date.now},
    count: Number,
  }],
  thankedWeekly: [{
    day: { type: Date, default: Date.now},
    count: { type: Number, default: 0},
    vc: { type: Number, default: 0},
    study: { type: Number, default: 0},
  }],
});

module.exports = thankedLog;
