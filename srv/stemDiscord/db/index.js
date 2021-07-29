const userInfoPublicSchema = require(`${__dirname}/schemas/userInfoPublic.js`);
const thankedLogSchemas = require(`${__dirname}/schemas/thankedLog.js`);
const aggregateUserInfoSchemas = require(`${__dirname}/schemas/aggregateUserInfo.js`);

module.exports = {
  userInfoPublicSchema,
  thankedLogSchemas,
  aggregateUserInfoSchemas,
};