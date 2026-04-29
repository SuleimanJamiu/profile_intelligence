const express = require("express");
const router = require("./router/user.routes");
const connectDB = require("./config/db");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/api', router);

if (require.main === module) {
  connectDB();
  app.listen(PORT, () => {
    console.log(`Application is running on Port ${PORT}`);
  });
}

module.exports = app;
