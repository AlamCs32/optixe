const router = require("express").Router()
const user_routes = require("./user_routes")

router.use('/api/user', user_routes)

module.exports = router