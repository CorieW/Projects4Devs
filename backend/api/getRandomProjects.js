const express = require("express");

const router = express.Router()
const db = require('../config/database.js')

router.get('/', (req, res) => {
    let numOfProjects = req.query.numOfProjects ? req.query.numOfProjects : 1
    if (numOfProjects < 1) numOfProjects = 1
    else if (numOfProjects > 10) numOfProjects = 10

    return db.getRandomProjects(numOfProjects, req.query.exclude, (statusCode, data) => {
        res.status(statusCode).send(data)
    })
})

module.exports = router