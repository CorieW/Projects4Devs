const mysql2 = require('mysql2')

let connection;

function connectToDatabase() {
    connection = mysql2.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        database: process.env.DATABASE_DATABASE,
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT
    })

    connection.connect(err => {
        console.log(err)
        if (err) setTimeout(connectToDatabase, 5000)
    })
}

connectToDatabase()

module.exports = connection