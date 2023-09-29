require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const server = express()
const cron = require('node-cron')

const PORT = process.env.PORT || 3001

// Middleware to enable JSON and CORS
server.use(express.json())
server.use(cors())

// Connect to Database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
})

const connection = mongoose.connection

connection.on('error', (error) => {
    console.log('Something went wrong while connecting to the Database')
    console.error(error)
})

connection.once('open', () => {
    console.log('Successfully connected to Database')
})

// Logic to delete all MongoDB Documents every Night
const deleteAllDocuments = require('./routes/routes')
cron.schedule('0 0 1 * *', deleteAllDocuments)

const APIRoute = require('./routes/routes')

server.use('/', APIRoute)

server.listen(PORT, '0.0.0.0', () => { console.log(`Server can be accessed on PORT: ${PORT}`) })