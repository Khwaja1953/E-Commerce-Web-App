
const express = require("express");
const {registerUser,verifyOtp,login ,updatedUser,deletedUser } = require("../Controllers/userController");
const router = express.Router();


//register user
router.post("/register",registerUser);  
router.post('/verifyotp', verifyOtp);
router.post('/login', login);
router.put("/updateuser",updatedUser);
router.delete("/deleteuser",deletedUser);

module.exports = router;