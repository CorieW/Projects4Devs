const express = require("express");

const router = express.Router()
const db = require('../config/database.js')

router.post('/', (req, res) => {
    if (!req.body.projectName) 
        return res.status(400).send({message: 'You must provide a project name.'})
    if (req.body.projectName.length < 3 || req.body.projectName.length > 75) 
        return res.status(400).send({message: 'The project name must contain between 3 and 75 characters.'})

    if (!req.body.desc) 
        return res.status(400).send({message: 'You must provide the project idea a description.'})
    if (req.body.desc.length < 100) 
        return res.status(400).send({message: 'The project idea\'s description must contain at least 100 characters.'})
    if (req.body.desc.length > 25000) 
        return res.status(400).send({message: 'The project idea\'s description is too long. There\'s a limit of 25,000 character'})

    if (req.body.tags && req.body.tags.length > 10) 
        return res.status(400).send({message: 'A project may have a max of 10 tags.'})

    let projectName = req.body.projectName
    let shortDesc = req.body.shortDesc
    let desc = req.body.desc
    let difficulty = req.body.difficulty
    let tags = req.body.tags ? req.body.tags : []

    db.addProject({ projectName, shortDesc, desc, difficulty, tags }, (statusCode, data) => {
        res.status(statusCode).send(data)
    })
})

module.exports = router