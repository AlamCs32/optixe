const express = require('express')
const app = express()
const port = 3000
const MongoDB = require("./config//dbConnect")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const router = require("./router")

MongoDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors())
app.use(morgan("dev"))

// Application Routers
app.use(router)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Server listening on port ${port}!`))