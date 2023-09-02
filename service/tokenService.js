const jwt = require("jsonwebtoken")
require("dotenv").config()
const { JWT_SECRET } = process.env

exports.Sing = (userId, secret = JWT_SECRET, expire) => {
    const options = expire ? { expiresIn: expire } : {};
    return jwt.sign({ userId }, secret, options)
}

exports.Verify = (token, secret = JWT_SECRET) => {
    return jwt.verify(token, secret)
}