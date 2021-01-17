const express = require("express");

const router = express.Router()
const db = require('../config/database.js')

router.post('/', (req, res) => {
    console.log(req.body)
    if (!req.body.projectName || req.body.projectName <= 0) 
        return res.status(400).send('You must provide the project a name.')
    if (!req.body.desc || req.body.desc <= 0) 
        return res.status(400).send('You must provide the project a description.')
    if (req.body.categories && req.body.categories.length > 10) 
        return res.status(400).send('A project may have a max of 10 categories.')

    let projectName = req.body.projectName
    let shortDesc = req.body.shortDesc
    let desc = req.body.desc
    let difficulty = req.body.difficulty
    let categories = req.body.categories ? req.body.categories : []

    if (categories)

    db.addProject({ projectName, shortDesc, desc, difficulty, categories }, (statusCode, message) => {
        res.status(statusCode).send(message)
    })
})

module.exports = router