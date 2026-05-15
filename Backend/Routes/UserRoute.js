
const express = require("express");
const {registerUser,verifyOtp,login ,updatedUser,deletedUser } = require("../Controllers/userController");
const router = express.Router();

//register user
router.post("/register",registerUser);  
router.post('/verifyotp', verifyOtp);
router.get('/login', login);
router.put("/",updatedUser);
router.delete("/",deletedUser)

module.exports = router;