const mysql2 = require('mysql2')

const connection = mysql2.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
})

connection.connect()

function getProject(projectID, callback)
{
    connection.query(`SELECT * FROM projects WHERE id=('${projectID}')`, (err, rows) => {
        if (err) return callback(500, {message: 'Something went wrong, please try again!'})
        if (rows.length == 0) return callback(404, {message: 'No project idea to show.'})
        return callback(200, {message: 'Successfully received project idea data.', data: rows[0]})
    })
}

function getRandomProjects(numOfProjects, exclude, callback)
{
    // * The exclude param should be an array of ID's to not show.
    // ! The below solution might considerably slow down when the database grows.
    
    // Select all of the projects that have been selected and randomly choose one.
    connection.query(`SELECT * FROM projects WHERE progress=('Accepted')`, (err, rows) => {
        if (err) return callback(500, {message: 'Something went wrong, please try again!'})

        const projects = []
        numOfProjects = numOfProjects < rows.length ? numOfProjects : rows.length

        for (i = 0; i < numOfProjects; i++) {
            const projectIndex = Math.floor(Math.random() * rows.length)
            projects.push(rows[projectIndex])
            rows.splice(projectIndex, 1)
        }

        // Runs through all of the tags and matches the tags to the projects in the 'projects' array.
        connection.query(`SELECT * FROM projects_tags`, (err, rows) => {
            if (err) return callback(500, {message: 'Something went wrong, please try again!'})
            
            rows.forEach((row) => {
                projects.forEach((project, index) => {
                    if (row['project_id'] === project['id'])
                    {
                        if(project['tags'] === undefined) project['tags'] = [row['tag']]
                        else project['tags'].push(row['tag'])

                        return
                    }
                })
            })

            if (rows.length == 0) return callback(404, {message: 'No project idea to show.'})
            return callback(200, {message: 'Successfully received project idea data.', data: projects})
        })
    })
}

function searchProjects(searchQuery, numOfProjects, callback)
{
    connection.query(`SELECT * FROM projects WHERE id=()`)

    // * Recommend projects where the project name contains the search query. Priority depending on similarity.
    // * Only recommend projects that have a progress of 'Accepted'.
    // * Recommend projects where the search query contains it's tags. Less priority than project names.
}

function addProject(data, callback)
{
    connection.query(`INSERT INTO projects (project_name, short_description, description, difficulty) 
                    VALUES ('${data['projectName']}', '${data['shortDesc']}', '${data['desc']}', '${data['difficulty']}');`, (err, rows) => {
        if (err) return callback(500, {message: 'Something went wrong, please try again!'})

        // I need the project ID to insert the project's tags into the projects_tags table.
        connection.query(`SELECT * FROM projects WHERE id=(SELECT LAST_INSERT_ID());`, (err, rows) => {
            if (err) return callback(500, {message: 'Something went wrong, please try again!'})

            let projectID = rows[0]['id']

            if (!data['tags'] || data['tags'].length === 0) 
            { // There are no tags, so there is no point in performming the rest of the function.
                return callback(200, {message: 'Successfully posted project idea. A moderator will confirm your entry shortly.', projectID})
            }

            let tagInsertionQuery = `INSERT INTO projects_tags (project_id, tag) VALUES `
            data['tags'].forEach((tag, index) => {
                tagInsertionQuery += `('${projectID}', '${tag}')`
                if (index != data['tags'].length - 1)
                    tagInsertionQuery += ', '
                else
                    tagInsertionQuery += ';'
            })
            
            // Insertion of the project's tags into the projects_tags table.
            connection.query(tagInsertionQuery, (err, rows) => {
                if (err) return callback(500, {message: 'Something went wrong, please try again!'})
                return callback(200, {message: 'Successfully posted project idea. A moderator will confirm your entry shortly.', projectID})
            })
        })
    })
}

module.exports = { connection, getProject, getRandomProjects, searchProjects, addProject }