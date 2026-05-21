
const express = require("express");
const {registerUser,verifyOtp,login ,updatedUser,deletedUser } = require("../Controllers/userController");
const {protectedMiddleware} = require("../middleware/protected")
const router = express.Router();


//register user
router.post("/register",registerUser);  
router.post('/verifyotp', verifyOtp);
router.post('/login', login);
router.put("/updateuser",protectedMiddleware,updatedUser);
router.delete("/deleteuser",deletedUser);

module.exports = router;    