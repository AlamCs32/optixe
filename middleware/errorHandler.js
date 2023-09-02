const joi = require("joi")
const customeError = require("../service/customeError")
const { DebugMod } = process.env

module.exports = (error, req, res, next) => {

    let error_mess = {
        code: 500,
        message: "internal server error",
        ...(DebugMod === "true" && { originalError: error.message })
    }

    if (error instanceof customeError) {
        error_mess.code = error.status
        error_mess.message = error.message
    }

    if (error instanceof joi.ValidationError) {
        error_mess.code = 403
        error_mess.message = error.details.map(i => (i.message))
    }
    return res.status(error_mess.code).json({
        success: false,
        message: error_mess
    })
}