const express = require("express");

const router = express.Router()
const db = require('../config/database.js')

router.get('/', (req, res) => {
    let projectID = req.query.id
    if(projectID === undefined) return res.status(400).send({message: 'Please enter a project ID.'})

    return db.getProject(projectID, (statusCode, data) => {
        res.status(statusCode).send(data)
    })
})

module.exports = router