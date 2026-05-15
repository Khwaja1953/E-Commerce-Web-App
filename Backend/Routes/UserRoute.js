
const express = require("express");
const {registerUser ,updatedUser,deletedUser}= require("../Controllers/userController");
const router = express.Router();

//register user
router.post("/register",registerUser);  
router.put("/",updatedUser);
router.delete("/",deletedUser)

module.exports = router;