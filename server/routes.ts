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
// gets information about user with inputted userID
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

// creates user with the inputter parameters
const createuser = async function(req, res) {
    const uid = req.query.uid;
    const first_name = req.query.first_name ?? '';
    const last_name = req.query.last_name ?? '';
    const about_me = req.query.about_me ?? '';
    const pronouns = req.query.pronouns ?? '';
    const gender = req.query.gender ?? '';
    const orientation = req.query.orientation ?? '';
    const birthday = req.query.birthday ?? '';
    const age = req.query.age ?? '';

    console.log("server side bday: " + birthday)

    connection.query(`
        INSERT INTO PROFILES (id, first_name, last_name, about_me, pronouns, gender, orientation, birthday, age)
        VALUES ('${uid}', '${first_name}', '${last_name}', '${about_me}', '${pronouns}', '${gender}', '${orientation}', STR_TO_DATE('${birthday}', '%m/%d/%Y'), '${age}')
    `, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Success! New user created with id: " + uid);
        }
    });
}

// updates user profile pic
const updateuserprofilepic = async function(req, res) {
    const uid = req.query.uid;
    const uri = req.query.uri ?? '';
    console.log('uid:' + uid)
    console.log('uri: ' + uri)
    connection.query(`UPDATE PROFILES
    SET image = '${uri}'
    WHERE id = '${uid}'`,
    (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Success! User image was updated with uid: " + uid);
        }
    });
}

const getnameageimage = async function(req, res) {
    const uid = req.query.uid
    //need to add age here
    connection.query(`SELECT first_name, last_name, image
    FROM PROFILES
    WHERE id = '${uid}'`, (err, data) => {
        if (err || data.length === 0) {
            console.log(err);
            res.json({});
        } else {
            res.json(data[0]);
        }
    });
}

// mysql match storage routes
// inserts new match into MATCHES table
const newmatch = async function(req, res) {
    const uid1 = req.query.uid1;
    const uid2 = req.query.uid2

    connection.query(`
    INSERT INTO MATCHES (userOneID, userTwoID)
    VALUES ('${uid1}', '${uid2}')
    `, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Success! New match added with between users with ids: " + uid1 + " and " + uid2);
        }
    });
}

// get all matches for a specific user
const getmatches = async function(req, res) {
    const userID = req.params.uid

    connection.query(`
    WITH allIds AS (
        SELECT userOneID AS id FROM MATCHES WHERE userOneID = '${userID}' OR userTwoID = '${userID}'
        UNION
        SELECT userTwoID AS id FROM MATCHES WHERE userOneID = '${userID}' OR userTwoID = '${userID}'
    ),
        relevantIds AS (
            SELECT id FROM allIds WHERE id != '${userID}'
        )
        SELECT PROFILES.id, first_name, last_name, image FROM PROFILES JOIN relevantIds ON PROFILES.id = relevantIds.id;
    `, (err, data) => {
        if (err || data.length === 0) {
            console.log(err);
            res.json({});
        } else {
            console.log("Matches for user: " + userID)
            console.log(data)
            res.json(data);
        }
    });
}

// mysql message storage routes
const newmessage = async function(req, res) {
    const senderID = req.query.senderID
    const receiverID = req.query.receiverID
    const message = req.query.message
    const timestamp = req.query.timestamp

    connection.query(`
    INSERT INTO MESSAGES (senderID, receiverID, message, timestamp)
    VALUES ('${senderID}', '${receiverID}', '${message}', '${timestamp}')
    `, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Success! New message sent by user with id: " + senderID + " and received by user with id: " + receiverID + " was added to the database.");
        }
    });

}

// get all of messages of a specific user
const getmessages = async function(req, res) {
    const userID = req.params.uid

    connection.query(`
    SELECT * FROM MESSAGES WHERE senderID = '${userID}' OR receiverID = '${userID}'
    `, (err, data) => {
        if (err || data.length === 0) {
            console.log(err);
            res.json({});
        } else {
            res.json(data);
        }
    });
}

// get chat rooom name between two users
const getroom = async function(req, res) {
    const uid1 = req.query.uid1;
    const uid2 = req.query.uid2;

    connection.query(`
    SELECT CONCAT(userOneID, '-', userTwoID) AS room FROM MATCHES
    WHERE (userOneID = '${uid1}' AND userTwoID = '${uid2}')
        OR (userOneID = '${uid2}' AND userTwoID = '${uid1}')
    `, (err, data) => {
        if (err || data.length === 0) {
            console.log(err);
            res.json({});
        } else {
            res.json(data);
        }
    });
}

// pql user-location Routes

// inserts user into table with a certain latitude and longitude
const createuserlocation = async function(req, res) {
    const uid = req.query.uid
    const lat = req.query.lat
    const long = req.query.long

    pql_db.none(`INSERT INTO users (id, location) VALUES ('${uid}', ST_GeomFromText('POINT(${long} ${lat})', 4326))`)
    .then(() => {
        console.log("New user location added to postgres with id: " + uid);
    })
    .catch((error) => {
        console.log('ERROR:', error)
    })
}

function convertIds(response) {
    let stringArray = []

    for (let i = 0; i < response.length; i++) {
        stringArray.push(response[i]['id'])
    }

    const string = '\'' + stringArray.join('\', \'') + '\''

    return string
}

// gets all users in a certain radius (in meters) from the inputted latitude and longitude (uses pql and mysql)
const getusersinradius = async function(req, res) {
    const uid = req.query.uid
    const lat = req.query.lat
    const long = req.query.long
    const rad = req.query.rad
    const genders = req.query.genders

    console.log(genders)

    // pql query to get the ids of all users in radius
    pql_db.any(`SELECT id
    FROM users
    WHERE ST_DWithin(location, 'POINT(${long} ${lat})', ${rad})
        AND id != '${uid}'`)
    .then(data => {
        console.log('these are the users: ')
        console.log(data) // print users in radius
    
        const ids = convertIds(data) // convert ids
        console.log(ids) // print ids string

        // mysql query to get the names of nearby users based on ids from earlier query
        connection.query(`
        SELECT *
        FROM PROFILES
        WHERE id IN (${ids}) AND gender IN (${genders})
        `, (err, data) => {
            if (err || data.length === 0) {
                console.log(err);
                res.json({});
            } else {
                console.log("These users are selected: ")
                console.log(data)
                res.json(data);
            }
        });
    })
    .catch((error) => {
        console.log('ERROR getting ids and names of users in radius from Postgres:', error)
    })
}

// updates user location of user with the inputted userID to the inputted latitude and longitude
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

const updateuserinfo = async function(req, res) {
    const uid = req.query.uid;
    const hometown = req.query.hometown ?? '';
    const lookingFor = req.query.lookingFor ?? '';
    const race = req.query.race ?? [];
    const religion = req.query.religion ?? '';
    const languages = req.query.languages ?? [];
    connection.query(`UPDATE PROFILES
    SET hometown = '${hometown}',
        lookingFor = '${lookingFor}',
        race = '${race}',
        religion = '${religion}',
        languages = '${languages}'
    WHERE id = '${uid}'`,
    (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Success! User info was updated with uid: " + uid);
        }
    });
}

const updatedatepreferences = async function(req, res) {
    const uid = req.query.uid;
    const vegetarian = req.query.uri ?? '';
    const priceLevel = req.query.priceLevel ?? '';
    const timesOfDay = req.query ?? [];
    connection.query(`UPDATE PROFILES
    SET vegetarian = '${vegetarian}',
        priceLevel =  '${priceLevel}'
        timesOfDay = ${timesOfDay}
    WHERE id = '${uid}'`,
    (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Success! User preferences was updated with uid: " + uid);
        }
    });
}

const updateuserinterests = async function(req, res) {
    const uid = req.query.uid;
    const interests = req.query.inserts ?? [];
    connection.query(`UPDATE PROFILES
    SET interests = '${interests}'
    WHERE id = '${uid}'`,
    (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Success! User interests was updated with uid: " + uid);
        }
    });
}

module.exports = {
    user,
    createuser,
    createuserlocation,
    newmatch,
    getmatches,
    newmessage,
    getmessages,
    getroom,
    getusersinradius,
    updateuserlocation,
    updateuserprofilepic,
    getnameageimage,
    updatedatepreferences
}