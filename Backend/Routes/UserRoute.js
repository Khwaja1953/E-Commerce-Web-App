
const express = require("express");
const {registerUser,verifyOtp,login } = require("../Controllers/userController");
const router = express.Router();

//register user
router.post("/register",registerUser);  
router.post('/verifyotp', verifyOtp);
router.get('/login', login);

module.exports = router;