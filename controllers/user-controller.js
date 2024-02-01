const asyncHandler = require("express-async-handler");
const userModel = require("./../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

/** 
 * @desc get user details
 * @route GET  /api/user/
 * @access Public
 */
const getUser = asyncHandler( async (req, res) => {
    const email = req.user.email;
    const id = req.user.id;
    const user = await userModel.findOne({email});
    if(user && user.id === id) {
        const data = user._doc;
        delete data.password;
        res.status(201).json(data);
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
    res.json({message: "get user details"});
});


/**
 * @desc register user
 * @route POST /api/user/register
 * @access Public
 */
const postRegister = asyncHandler( async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userPresent = await userModel.findOne({email});
    console.log(userPresent)
    if(userPresent) {
        res.status(400);
        throw new Error("User are already register");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    let user = await userModel.create({
        name,
        email,
        password: hashPassword
    });

    if(user) {
        const data = user._doc;
        delete data.password;
        res.status(201).json(data);
    }
    else {
        res.status(400);
        throw new Error("User does not register");
    }
});


/**
 * @desc login user 
 * @Route POST /api/user/login
 * @access Public
 */
const postLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await userModel.findOne({email});
    if(user && await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({
            user: {
                name: user.name,
                email: user.email,
                id: user.id,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "30m"}
        );

        res.status(200).json({token: accessToken});
    }
    else {
        res.status(400);
        throw new Error("email and password are not valid");
    }
});

module.exports = {getUser, postRegister, postLogin};
