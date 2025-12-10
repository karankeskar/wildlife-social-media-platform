import {Request, Response} from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {User} from '../models/userModel'

// @desc Register new user
// @route POST /api/register
// @access public
export const registerUser = asyncHandler(async(req:Request, res:Response) => {
    const{ fullName, email, password, phoneNumber} = req.body;
    if(!fullName || !email || !password ||!phoneNumber){
        res.status(400);
        throw new Error('Please add all fields');
    }
    // check user exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400);
        throw new Error("User Already Exists")
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        fullName,
        email, 
        password:hashedPassword,
        phoneNumber,
    })
    if(user){
        res.status(201).json({
        _id:user._id,
        name:user.fullName,
        email:user.email,
        token:generateToken(user._id.toString())
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }
    res.json({message:'Register User'})
});

// @desc Authenticate  user
// @route POST /api/user/login
// @access public
export const loginUser = async(req:Request, res:Response) => {
    const{email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Please enter username or password")
    }

    const user = await User.findOne({email})
    if(user && await(bcrypt.compare(password, user.password))){
        res.json({
            _id:user._id,
            name:user.fullName,
            email:user.email,
            token:generateToken(user._id.toString())
        })
    }
    else{
        res.status(400);
        throw new Error('Invalid Credentials')
    }
}

// @desc Get users data
// @route GET /api/user/me
// @access public
export const getUser = asyncHandler(async(req:Request, res:Response) => {

    if(!req.user){
        res.status(401);
        throw new Error('Not Authorized');
    }
    res.json({
        _id:req.user?._id,
        fullName:req.user?.fullName,
        email:req.user?.email
    })
});

const generateToken = (id:string): string => {
    const secret = process.env.JWT_SECRET;
    if(!secret){
        throw new Error("No JWT_SECRET present")
    }
    return jwt.sign({id}, secret, {
            expiresIn:'30d',
    })
}