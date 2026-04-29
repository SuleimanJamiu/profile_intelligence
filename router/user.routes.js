const express = require("express");
const {deleteProfile, createProfiles, profiles, profilesById }= require("../controller/user.controller");
const cors = require("../middleware/user.middleware");

const router = express.Router();

router.post('/profiles', cors, createProfiles);
router.get('/profiles/:id', cors, profilesById);
router.get('/profiles', cors, profiles);
router.delete('/profiles/:id', cors, deleteProfile);

module.exports = router;

