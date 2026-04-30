const express = require("express");
const router = require("./router/user.routes");
const connectDB = require("./config/db");
const app = express();

require("dotenv").config();

<<<<<<< HEAD
const PORT = process.env.PORT || 8080;
=======
const PORT = process.env.PORT||8080;
>>>>>>> 22f865edee4788f695f95f7b6bfd475d15b92efe

app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Profile Intelligence API is running' });
});

if (require.main === module) {
  connectDB();
  app.listen(PORT, () => {
    console.log(`Application is running on Port ${PORT}`);
  });
}

module.exports = app;
