const mongoose = require("mongoose")
require("dotenv").config()
const { DataBaseURL } = process.env

module.exports = () => {
    mongoose.connect(DataBaseURL)
        .then(() => console.log("MongoDB Connected"))
        .catch(error => console.log({ error }))
}