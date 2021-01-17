const express = require('express')
const dotenv = require('dotenv')

dotenv.config()
const db = require('./config/database')
const app = express()
const port = process.env.PORT || 3001

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Route Middlewares
app.use('/api/getprojects', require('./api/getProjects'))
app.use('/api/addproject', require('./api/addProject'))

app.listen(port)