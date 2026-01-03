import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Car from "../models/car.js";
//generate JWT token
const generateToken =(userId)=>{
    const payload=userId;
    return jwt.sign(payload, process.env.JWT_SECRET)
}

//Register User
export const registerUser= async (req,res)=>{
    try{
        const {name,email,password}=req.body
        if (!name?.trim() || !email?.trim() || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
            }

            if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email address',
            });
            }

            if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters',
            });
            }

        const hashedPassword=await bcrypt.hash(password,10)
        const user= await User.create({name,email,password:hashedPassword})
        const token= generateToken(user._id.toString())
        res.json({success:true, token})
    }catch(error){
            console.log(error.message);
            res.json({success:false,message:error.message})
    }
}

//Login User
export const loginUser= async (req,res)=>{
    try{
        const {email,password}=req.body
        const user= await User.findOne({email})
        if(!user)
            return res.json({success:false,message:"User not found"});
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch)
            return res.json({success:false,message:"Invalid is Credintials"})
        const token= generateToken(user._id.toString())
        res.json({success:true, token})
    }catch(error){
         console.log(error.message);
         res.json({success:false,message:error.message})
    }
}


//Get user data using Token (JWT)

export const getUserData=async (req,res)=>{
    try{
        const {user}=req;
        res.json({success:true,user})
    }catch(error){
         console.log(error.message);
         res.json({success:false,message:error.message})
    }
}

//getall cars for front end
export const getCars=async (req,res)=>{
    try{
        console.log('getCars called')
        const cars=await Car.find({isAvailable:true})
        console.log('cars found:', cars.length)
         res.json({success:true,cars})
    }catch(error){
         console.log(error.message);
         res.json({success:false,message:error.message})
    }
}
