const serverless = require('serverless-http');
const app = require('../index');
const connectDB = require('../config/db');

connectDB();

module.exports = serverless(app);
