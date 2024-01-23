// connect to mysql user-schema database
const mysql = require('mysql')
const config = require('./config.json')

// Creates MySQL connection using database credential provided in config.json
// Do not edit. If the connection fails, make sure to check that config.json is filled out correctly
const connection = mysql.createConnection({
  host: config.mysql_host,
  user: config.mysql_user,
  password: config.mysql_password,
  port: config.mysql_port,
  database: config.mysql_db
});
connection.connect((err) => err && console.log(err));

// connect to postgres user-location database
const pgp = require('pg-promise')(/* options */)
const pql_db = pgp({
    host: config.psql_host,
    user: config.psql_user,
    password: config.psql_password,
    port: config.psql_port,
    database: config.psql_db
  })


// mysql user-schema Routes
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
    const orientation = req.query.orientation ?? '';
    const birthday = req.query.birthday ?? '';

    console.log("server side bday: " + birthday)

    connection.query(`
        INSERT INTO PROFILES (id, first_name, last_name, about_me, pronouns, gender, orientation, birthday)
        VALUES ('${uid}', '${first_name}', '${last_name}', '${about_me}', '${pronouns}', '${gender}', '${orientation}','${birthday}')
    `, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Success! New user created with id: " + uid);
        }
    });
}

// pql user-location Routes
const createuserlocation = async function(req, res) {
    const uid = req.query.uid
    const lat = req.query.lat
    const long = req.query.lat

    pql_db.none(`INSERT INTO users (id, location) VALUES (${uid}, ST_GeomFromText('POINT(${long} ${lat})', 4326))`)
    .catch((error) => {
    console.log('ERROR:', error)
    })
}

const getusersinradius = async function(req, res) {
    const uid = req.query.uid
    const lat = req.query.lat
    const long = req.query.lat
    const rad = req.query.rad

    pql_db.any(`SELECT *
    FROM users
    WHERE ST_DWithin(location, 'POINT(${long} ${lat})', ${rad})
        AND id != '${uid}'`)
    .then(data => {
        res.json(data); // print new user id;
    })
    .catch((error) => {
        console.log('ERROR:', error)
    })
}

const updateuserlocation = async function(req, res) {
    const uid = req.query.uid
    const lat = req.query.lat
    const long = req.query.lat

    pql_db.none(`UPDATE users
    SET location = ST_GeomFromText('POINT(${long} ${lat})', 4326)
    WHERE id = '${uid}'`)
    .catch((error) => {
        console.log('ERROR:', error)
    })
}

module.exports = {
    user,
    createuser
}