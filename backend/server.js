const express = require('express')
const dotenv = require('dotenv')

dotenv.config()
const db = require('./config/database')
const app = express()
const port = process.env.PORT || 3001

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})
// Route Middlewares
app.use('/api/project', require('./api/getProject'))
app.use('/api/projects', require('./api/getProjects'))
app.use('/api/add', require('./api/addProject'))
app.use('/api/random-projects', require('./api/getRandomProjects'))

app.listen(port)