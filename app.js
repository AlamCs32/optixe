const express = require('express')
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")

const MongoDB = require("./config//dbConnect")
const router = require("./router")
const errorHandler = require("./middleware/errorHandler")

require("dotenv").config()

const app = express()
const port = process.env.PORT || 3000

MongoDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors())
app.use(morgan("dev"))

// Application Routers
app.use(router)

app.get('/', (req, res) => res.send('Hello World!'))

app.use(errorHandler)
app.listen(port, () => console.log(`Server listening on port ${port}!`))