const express = require("express");

const router = express.Router()
const mysqlConnection = require('../config/database.js')

router.get('/', (req, res) => {
    let projectID = req.query.id
    if(projectID === undefined) return res.status(400).send({message: 'Please enter a project ID.'})

    return getProject(projectID, (statusCode, data) => {
        res.status(statusCode).send(data)
    })
})

function getProject(projectID, callback)
{
    mysqlConnection.query(`SELECT progress FROM projects WHERE (id='${projectID}')`, (err, rows) => {
        if (err) return callback(500, {message: 'Something went wrong, please try again!'})
        if (rows.length == 0) return callback(404, {message: 'No project idea to show.'})
        return callback(200, {message: 'Successfully received project idea data.', data: rows[0]})
    })
}

module.exports = router