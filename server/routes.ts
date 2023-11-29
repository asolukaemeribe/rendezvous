const mysql = require('mysql')
const config = require('./config.json')

// Creates MySQL connection using database credential provided in config.json
// Do not edit. If the connection fails, make sure to check that config.json is filled out correctly
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
});
connection.connect((err) => err && console.log(err));

// Routes
const user = async function(req, res) {
    const userID = req.params.uid

    connection.query(`
        SELECT *
        FROM PROFILES
        WHERE id = '${userID}'
    `, (err, data) => {
        if (err || data.length === 0) {
            console.log(err);
            res.json({});
        } else {
            res.json(data[0]);
        }
    });
}

const createuser = async function(req, res) {
    const uid = req.query.uid;
    const first_name = req.query.first_name ?? '';
    const last_name = req.query.last_name ?? '';
    const about_me = req.query.about_me ?? '';
    const pronouns = req.query.pronouns ?? '';
    const gender = req.query.gender ?? '';

    connection.query(`
        INSERT INTO PROFILES (id, first_name, last_name, about_me, pronouns, gender)
        VALUES (${uid}, ${first_name}, ${last_name}, ${about_me}, ${pronouns}, ${gender})
    `, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Success! New user created with id: " + uid);
        }
    });
}

module.exports = {
    user,
    createuser
}