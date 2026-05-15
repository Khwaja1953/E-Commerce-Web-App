
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer')
const transporter = require('../db/nodemailer');



const registerUser = async (req, res) => {
    try {

        const { name, email, password, phoneNumber } = req.body;
        console.log(req.body)



        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                error: "User already exists", message: null
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        console.log(hash)


        const otp = Math.floor(Math.random() * 9000 + 1000)
        console.log(otp);
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "OTP for E-commerce web App",
            text: `your otp for E-commerce web App is ${otp} please do not share with anyone`,
        });
        const newUser = await User.create({
            name, email, password: hash, storedOtp: { otp: otp },phoneNumber
        });
        console.log(newUser);
        return res.status(201).json({
            message: "User registered successfully"
        });

    }
    catch (error) {

        return res.status(500).json({ error: error.message });
    }
}
//put route
const updatedUser = async (req, res) => {

    try {
        const { name, phoneNumber, address } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.body.id,
            {
                name,
                phoneNumber,
                address
            },
            { new: true },

        );
        if (!updatedUser) {
            return res.status(404).json({ message: "user not found" });



        }
        res.status(201).json({ message: "user updated successfully", updatedUser })



    }
    catch (error) {

        return res.status(500).json({ error: error.message });
    }
};

//for otp verification

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }
         if (!user.storedOtp || !user.storedOtp.otp) {
            return res.status(400).json({
                error: "OTP not found"
            });
        }
        if (user.storedOtp.otp != otp) {
            return res.status(400).json({
                error: "Invalid OTP"
            });
        }
           user.isVerified = true;
           user.storedOtp = undefined;

        await user.save();

        return res.status(200).json({
            message: "OTP verified successfully. You can login now."
        });
    }
       catch (error) {
        return res.status(500).json({ error: error.message});
    }
}
    
const login = async(req,res)=>{
    try{
        const {email, password } = req.body;
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({error:"invalid email"});
        }

        if(!bcrypt.compareSync(password, User.password)){//bcrypt compares:entered password vs hashed password
         //If wrong → error message.
        return res.status(400).json({error:"invalid password"});
 }
        
        if(!user.isVerified)
        { return res.status(400).json({error:"please verify your account first"})}
    }
     catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
//Deleteduser
const deletedUser = async (req, res) => {
    try {
        const id = req.body.id;
        console.log(id);
        const user = await User.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        };
        res.status(200).json({ message: "user deleted sucessfullly" })




    } catch (error) {
        return res.status(500).json({ error: error.message });


    }

}
module.exports = { registerUser, updatedUser, deletedUser }
