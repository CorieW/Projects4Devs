const express = require("express");

const router = express.Router()
const db = require('../config/database.js')

router.get('/', (req, res) => {
    // This determines where the projects are loaded from.
    // For example, to get projects after the project ID '106'
    // you would set the pointing ID to '106'.
    let pointingID = req.body.pointingID ? req.body.pointingID : 0
    // Set to true if the pointingID's project should be
    // included in the list of returned projects.
    let includePointingID = req.body.includePointingID ? req.body.includePointingID : false
    // The query is any relevant information necessary
    // to identify any specific project. The search query
    // compares project categories and project names
    // and looks for matches.
    let searchQuery = req.body.searchQuery ? req.body.searchQuery : ''
    // The amount of projects to return.
    // *Note: Min of 1 project and a max of 10 projects.
    let numOfProjects = req.body.numOfProjects ? req.body.numOfProjects : 10

    db.getProjects(pointingID, includePointingID, searchQuery, numOfProjects);
})

module.exports = router