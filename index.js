const express = require("express")
const dotenv = require("dotenv").config()
const { errorHandler } = require('./middleware/errorMiddleware')
const bodyParser = require("body-parser"); 
const PORT = process.env.NODE_PORT || 8000
const connectDB = require('./dbconfig/db')
connectDB()

const app = express()

app.use(bodyParser.json());

app.use('/api', require('./routes/api'))
app.use('/api/user', require('./routes/userRoutes'))


//To Override express default error message 
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))