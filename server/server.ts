const express = require('express');
const cors = require('cors');
const serverConfig = require('./config')
const routes = require('./routes.ts');

const app = express();
app.use(cors({
    origin: '*',
}));

// We use express to define our various API endpoints and
// provide their handlers that we implemented in routes.js
app.get('/user/:uid', routes.user);
app.get('/newuser', routes.createuser);
app.get('/newuserlocation', routes.createuserlocation);
app.get('/getusersinradius', routes.getusersinradius);
app.get('/updateuserlocation', routes.updateuserlocation);
app.get('/updateimage', routes.updateuserprofilepic);
app.get('/getimage', routes.getnameageimage);

app.get('/', (req, res) => {
    res.send('Rendezvous Server made with Express');
});

app.listen(serverConfig.server_port, () => {
    console.log(`Server running at http://${serverConfig.server_host}:${serverConfig.server_port}/`)
});
