const express = require('express')
const cors = require('cors')
const port=process.env.port || 5000
const app = express()
app.use(cors())
const connectDB = require('../backend/config/db')
// const cors = require('cors')
// app.use(cors)
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use('/get', require('./routes/userRoutes'))


connectDB()
app.listen(port, ()=>console.log(`server started on port ${port}`))