const { User } = require("../model")
const { userExist, notMatch } = require("../service/customeError")
const { singupJoi, loginJoi, changePasswordJoi, emailJoi, resetPasswordJoi, updateProfileJoi } = require("../service/joi/userJoi")
const { Sing, Verify } = require("../service/tokenService")
const { JWT_SECRET } = process.env

exports.singup = async (req, res, next) => {
    let validate = singupJoi(req.body)
    if (validate) return next(validate)

    try {

        let user = await User.findOne({ email: req.body.email })
        if (user) return next(userExist())

        user = await User.create(req.body)
        let token = Sing(user._id)

        return res.status(200).json({ success: true, token, user })

    } catch (error) {
        return next(error)
    }
}

exports.login = async (req, res, next) => {
    let validate = loginJoi(req.body)
    if (validate) return next(validate)

    try {

        let user = await User.findOne({ email: req.body.email }).select("+password")
        if (!user) return next(userExist("User not Exist pls SingUP!", 404))

        let match = await user.matchPassword(req.body.password)
        if (!match) return next(notMatch())

        let token = Sing({ userId: user._id })

        return res.status(200).json({ success: true, token })
    } catch (error) {
        return next(error)
    }
}

exports.changePassword = async (req, res, next) => {
    let validate = changePasswordJoi(req.body)
    if (validate) return next(validate)
    try {

        let user = await User.findById(req.user._id).select("+password")
        if (!user) return next(userExist())

        let match = await user.matchPassword(req.body.old_password)
        if (!match) return next(notMatch("Password is incorrect!"))

        user.password = req.body.password
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Your Password Changed Successfully!"
        })
    } catch (error) {
        return next(error)
    }
}

exports.resetPasswordSendLink = async (req, res, next) => {
    let validate = emailJoi(req.body)
    if (validate) return next(validate)

    try {

        let user = await User.findOne({ email: req.body.email })
        if (!user) return next(userExist("User not Found!"))

        let secretKey = user._id + JWT_SECRET

        let token = Sing({ userId: user._id }, secretKey, '5m')

        let link = `${req.protocol}://${req.get("host")}/api/user/reset/password/${user._id}/${token}`
        console.log({ link })

        return res.status(200).json({ success: true, message: "Pls Check Your Email!" })
    } catch (error) {
        return next(error)
    }
}

exports.resetPassword = async (req, res, next) => {
    let { id, token } = req.params
    let validate = resetPasswordJoi({
        password: req.body.password, id, token
    })
    if (validate) return next(validate)

    try {
        let user = await User.findById(req.params.id).select("+password")
        if (!user) return next(userExist("User Not Found"))

        let secretKey = user._id + JWT_SECRET

        Verify(token, secretKey)

        user.password = req.body.password
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Your Password is Change"
        })

    } catch (error) {
        return next(error)
    }
}

exports.getProfile = async (req, res, next) => {
    try {

        let user = await User.findById(req.user._id)
        return res.status(200).json({
            success: true, data: user
        })

    } catch (error) {
        return next(error)
    }
}

exports.updateProfile = async (req, res, next) => {
    try {

        let validate = updateProfileJoi(req.body)
        if (validate) return next(validate)

        let user = await User.findById(req.user._id)
        if (!user) return next(userExist("User Not Preset!", 404))
        user = await User.updateOne(user._id, req.body)

        return res.status(200).json({
            success: true, data: user
        })
    } catch (error) {
        return next(error)
    }
}