const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["customer", "opticial", "admin", "salesman"],
        default: "customer"
    },
}, {
    timestamps: true
})

module.exports = model("user", userSchema, "user")