const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const authHandler = asyncHandler(async (req, res, next) => {
    let token;
    let authorizeToken = req.headers.authorization || req.headers.Authorization;

    if(authorizeToken && authorizeToken.startsWith("Bearer")) {
        token = authorizeToken.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
            if(error) {
                res.status(401);
                throw new Error("User is not authorized or token is expired.");
            }
            req.user = decoded.user;
            next();
        });
    }

    if(!token) {
        res.status(401);
        throw new Error("user is not authorized or user missing token");
    }
});

module.exports = authHandler;