const { User } = require("../model")
const { unAuthorize } = require("../service/customeError")
const { Verify } = require("../service/tokenService")

exports.Auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization

        if (token && token.startsWith('Bearer')) {
            token = token.split(' ')[1]
            // verifying token
            let { userId } = Verify(token)
            req.user = await User.findById(userId.userId).catch(e => console.log({ e }))
            next()
        } else {
            return next(unAuthorize())
        }
    } catch (error) {
        return next(unAuthorize())
    }
}

exports.isAuthorize = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return next(unAuthorize("UnAuthorized User!"))
        }
        next()
    }
}