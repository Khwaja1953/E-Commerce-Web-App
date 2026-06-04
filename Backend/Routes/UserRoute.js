
const express = require("express");
const {registerUser,verifyOtp,loginUser ,updatedUser,deletedUser } = require("../Controllers/userController");
const {protectedMiddleware} = require("../middleware/protected")

const router = express.Router();


//register user
router.post("/register",registerUser);  
router.post('/verifyotp', verifyOtp);
router.post('/login', loginUser);
router.put("/updateuser",protectedMiddleware,updatedUser);
router.delete("/deleteuser",deletedUser);

module.exports = router;    