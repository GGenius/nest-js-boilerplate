const packageManager = require('./packageManager');
const app = require('./app');
const authType = require('./authType');
const additionalAuthQuestions = require('./additionalAuthQuestions');
const identifier = require('./identifier');
const description = require('./description');

module.exports = {
  packageManager,
  app,
  auth: {
    type: authType,
    additionalQuestions: additionalAuthQuestions,
  },
  identifier,
  description,
};