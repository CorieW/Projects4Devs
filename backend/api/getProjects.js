const express = require("express");

const router = express.Router()
const db = require('../config/database.js')

router.get('/', (req, res) => {
    let searchQuery = req.query.searchQuery ? req.query.searchQuery : ''

    // *Note: Min of 1 project and a max of 10 projects.
    let numOfProjects = req.query.numOfProjects ? req.query.numOfProjects : 10
    if (numOfProjects < 1) numOfProjects = 1
    else if (numOfProjects > 10) numOfProjects = 10

    //db.searchProjects(searchQuery, numOfProjects);
    res.status(200).send("sad")
})

module.exports = router