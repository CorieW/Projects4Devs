const express = require("express");

const router = express.Router()
const mysqlConnection = require('../config/database.js')

router.get('/', (req, res) => {
    let searchQuery = req.query.searchQuery ? req.query.searchQuery : ''
    // The below line will replace all of the apostrophes with double apostrophes to avoid MySQL syntax errors.
    searchQuery = searchQuery.replace(/'/g, `''`)

    // *Note: Min of 1 project and a max of 10 projects.
    let page = req.query.page ? req.query.page : 0
    if (page < 0) page = 0

    let numOfProjects = req.query.numOfProjects ? req.query.numOfProjects : 10
    if (numOfProjects < 1) numOfProjects = 1
    else if (numOfProjects > 10) numOfProjects = 10

    return getProjects(searchQuery, page, numOfProjects, (statusCode, data) => {
        res.status(statusCode).send(data)
    })
})


function getProjects(searchQuery, page, numOfProjects, callback)
{
    const query = `SELECT * FROM projects WHERE (project_name LIKE '%${searchQuery}%') AND (progress = 'Accepted') LIMIT ${numOfProjects} OFFSET ${page * numOfProjects}`

    mysqlConnection.query(query, (err, rows) => {
        console.log(err)
        if (err) return callback(500, {message: 'Something went wrong, please try again!'})
        if (rows.length == 0) return callback(404, {message: 'No project ideas found.'})

        const projects = rows;

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

    // * Recommend projects where the project name contains the search query. Priority depending on similarity.
    // * Only recommend projects that have a progress of 'Accepted'.
    // * Recommend projects where the search query contains it's tags. Less priority than project names.
}

module.exports = router