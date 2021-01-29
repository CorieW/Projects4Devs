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
    mysqlConnection.query(`SELECT * FROM projects WHERE (id='${projectID}') AND (progress='Accepted')`, (err, rows) => {
        if (err) return callback(500, {message: 'Something went wrong, please try again!'})
        if (rows.length == 0) return callback(404, {message: 'No project idea to show.'})

        const project = rows[0]

        // Runs through all of the tags and matches the tags to the projects in the 'projects' array.
        mysqlConnection.query(`SELECT * FROM projects_tags`, (err, rows) => {
            if (err) return callback(500, {message: 'Something went wrong, please try again!'})
            
            rows.forEach((row) => {
                if (row.project_id === project.id)
                {
                    if(project.tags === undefined) project.tags = [row.tag]
                    else project.tags.push(row.tag)

                    return
                }
            })

            return callback(200, {message: 'Successfully received project idea data.', data: project})
        })
    })
}

module.exports = router