
const express = require("express");
const registerUser = require("../Controllers/userController");
const router = express.Router();

//register user
router.post("/register",registerUser);  


module.exports = router;