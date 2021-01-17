const mysql2 = require('mysql2')

const connection = mysql2.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
})

// !What is the database is down? Try reconnecting maybe?
connection.connect()

function getProjects(pointingID, includePointingID, searchQuery, numOfProjects)
{
    connection.query()
}

function addProject(data, callback)
{
    connection.query(`INSERT INTO projects (project_name, short_description, description, difficulty) 
                    VALUES ('${data['projectName']}', '${data['shortDesc']}', '${data['desc']}', '${data['difficulty']}');`, (err, rows) => {
        if (err) return callback(500, 'Something went wrong, please try again!')

        connection.query(`SELECT * FROM projects WHERE id=(SELECT LAST_INSERT_ID());`, (err, rows) => {
            if (err) return callback(500, 'Something went wrong, please try again!')
            
            let projectID = rows[0]['id']
            let categoryInsertionQuery = `INSERT INTO projects_categories (project_id, category) VALUES `
            data['categories'].forEach((category, index) => {
                categoryInsertionQuery += `('${projectID}', '${category}')`
                if (index != data['categories'].length - 1)
                    categoryInsertionQuery += ', '
                else
                    categoryInsertionQuery += ';'
            })
            
            connection.query(categoryInsertionQuery, (err, rows) => {
                if (err) return callback(500, 'Something went wrong, please try again!')
                return callback(200, 'Successfully posted project. A moderator will confirm your entry shortly.')
            })
        })
    })

    /*categories.forEach(category => {
        query += `('${projectID}', '${categoryID}')`
    })*/
}

module.exports = { connection, getProjects, addProject }