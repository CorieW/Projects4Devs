const express = require("express");

const router = express.Router()
const mysqlConnection = require('../config/database.js')

router.post('/', (req, res) => {
    if (!req.body.projectName) 
        return res.status(400).send({message: 'You must provide a project name.'})
    if (req.body.projectName.length < 3 || req.body.projectName.length > 75) 
        return res.status(400).send({message: 'The project name must contain between 3 and 75 characters.'})

    if (req.body.shortDesc > 150)
        return res.status(400).send({message: 'The project idea\'s short description is too long. There\'s a limit of 150 character'})

    if (!req.body.desc) 
        return res.status(400).send({message: 'You must provide the project idea a description.'})
    if (req.body.desc.length < 150) 
        return res.status(400).send({message: 'The project idea\'s description must contain at least 150 characters.'})
    if (req.body.desc.length > 25000) 
        return res.status(400).send({message: 'The project idea\'s description is too long. There\'s a limit of 25,000 character'})

    if (req.body.tags && req.body.tags.length > 10) 
        return res.status(400).send({message: 'A project may have a max of 10 tags.'})

    let projectName = req.body.projectName
    // The below line will replace all of the apostrophes with double apostrophes to avoid MySQL syntax errors.
    projectName = projectName.replace(/'/g, `''`)
    let shortDesc = req.body.shortDesc
    shortDesc = shortDesc.replace(/'/g, `''`)
    let desc = req.body.desc
    desc = desc.replace(/'/g, `''`)
    console.log(desc)
    let difficulty = req.body.difficulty
    difficulty = difficulty.replace(/'/g, `''`)
    let tags = req.body.tags ? req.body.tags : []
    tags.forEach(tag => {
        tag = tag.replace(/'/g, `''`)
    })

    addProject({ projectName, shortDesc, desc, difficulty, tags }, (statusCode, data) => {
        res.status(statusCode).send(data)
    })
})

function addProject(data, callback)
{
    const query = `INSERT INTO projects (project_name, short_description, description, difficulty) 
                VALUES ('${ data.projectName }', '${ data.shortDesc }', '${ data.desc }', '${ data.difficulty }');`

    mysqlConnection.query(query, (err, rows) => {
        if (err) return callback(500, {message: 'Something went wrong, please try again!'})

        // I need the project ID to insert the project's tags into the projects_tags table.
        mysqlConnection.query(`SELECT * FROM projects WHERE id=(SELECT LAST_INSERT_ID());`, (err, rows) => {
            if (err) return callback(500, {message: 'Something went wrong, please try again!'})

            let projectID = rows[0].id

            if (!data.tags || data.tags.length === 0) 
            { // There are no tags, so there is no point in performming the rest of the function.
                return callback(200, {message: 'Successfully posted project idea. A moderator will confirm your entry shortly.', projectID})
            }

            let tagInsertionQuery = `INSERT INTO projects_tags (project_id, tag) VALUES `
            data.tags.forEach((tag, index) => {
                tagInsertionQuery += `('${projectID}', '${tag}')`
                if (index != data.tags.length - 1)
                    tagInsertionQuery += ', '
                else
                    tagInsertionQuery += ';'
            })
            
            // Insertion of the project's tags into the projects_tags table.
            mysqlConnection.query(tagInsertionQuery, (err, rows) => {
                if (err) return callback(500, {message: 'Something went wrong, please try again!'})
                return callback(200, {message: 'Successfully posted project idea. A moderator will confirm your entry shortly.', projectID})
            })
        })
    })
}

module.exports = router