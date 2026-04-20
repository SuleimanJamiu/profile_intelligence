const express = require("express");
const userData = require("../controller/user.controller");

const router = express.Router();

router.get('/profiles', userData);


module.exports = router;

