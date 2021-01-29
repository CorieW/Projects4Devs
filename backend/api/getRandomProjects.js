const express = require("express");

const router = express.Router()
const mysqlConnection = require('../config/database.js')

router.get('/', (req, res) => {
    let numOfProjects = req.query.numOfProjects ? req.query.numOfProjects : 1
    if (numOfProjects < 1) numOfProjects = 1
    else if (numOfProjects > 10) numOfProjects = 10

    return getRandomProjects(numOfProjects, req.query.exclude, (statusCode, data) => {
        res.status(statusCode).send(data)
    })
})

function getRandomProjects(numOfProjects, exclude, callback)
{
    // * The exclude param should be an array of ID's to not show.
    // ! The below solution might considerably slow down when the database grows.
    
    // Select all of the projects that have been selected and randomly choose one.
    mysqlConnection.query(`SELECT * FROM projects WHERE progress=('Accepted')`, (err, rows) => {
        if (err) return callback(500, {message: 'Something went wrong, please try again!'})
        if (rows.length == 0) return callback(404, {message: 'No project idea to show.'})

        const projects = []
        numOfProjects = numOfProjects < rows.length ? numOfProjects : rows.length

        for (i = 0; i < numOfProjects; i++) {
            const projectIndex = Math.floor(Math.random() * rows.length)
            projects.push(rows[projectIndex])
            rows.splice(projectIndex, 1)
        }

        // Runs through all of the tags and matches the tags to the projects in the 'projects' array.
        mysqlConnection.query(`SELECT * FROM projects_tags`, (err, rows) => {
            if (err) return callback(500, {message: 'Something went wrong, please try again!'})
            
            rows.forEach((row) => {
                projects.forEach((project, index) => {
                    if (row.project_id === project.id)
                    {
                        if(project.tags === undefined) project.tags = [row.tag]
                        else project.tags.push(row.tag)

                        return
                    }
                })
            })

            return callback(200, {message: 'Successfully received project idea data.', data: projects})
        })
    })
}

module.exports = router