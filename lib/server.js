const express = require('express');
const path = require('path');
const database = require('./middleware/database');
const expressServer = express();
const helpers = require('./helpers');
const users = require('./users');
const cors = require('cors');

expressServer.use(cors());

expressServer.use(express.json());

expressServer.use(express.urlencoded({
    extended : true
}));

// Connect to Database.
database.connect();

// Client Endpoint
expressServer.get('/', (req, res) => {

    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.sendFile(path.resolve(__dirname, '../client/index.html'));

});

// Server Endpoints.
expressServer.get('/getfiledata/:fileName', (req, res) => {

    console.log(req.params.fileName);

    helpers.readFile(req.params.fileName + '.json').then( (result) => {

        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(result);

    });
});

// Create User
expressServer.post('/users', (req, res) => {



    users.create(req.body, (code, returnObj) => {

        res.setHeader('Content-Type', 'application/json');
        res.status(code);
        res.send(returnObj);

    });
    
});

// Get Users
expressServer.get('/users', (req, res) => {

    users.read((code, returnObj) => {

        res.setHeader('Content-Type', 'application/json');
        res.status(code);
        res.send(returnObj);

    });

});

// Get User By id
expressServer.get('/users/:id', (req, res) => {


 
    if(req.params.id) {

        users.getUserById(req.params.id, (code, returnObj) => {

            res.setHeader('Content-Type', 'application/json');
            res.status(code);
            res.send(returnObj);
    
        });
    
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send({});
    }

});

// Delete User
expressServer.delete('/users', (req, res) => {

    users.delete(req.body, (code, returnObj) => {

        res.setHeader('Content-Type', 'application/json');
        res.status(code);
        res.send(returnObj);

    });

});

// Delete All User
expressServer.delete('/users/deleteall', (req, res) => {

    users.deleteAll(req.body, (code, returnObj) => {

        res.setHeader('Content-Type', 'application/json');
        res.status(code);
        res.send(returnObj);

    });

});

// Update User
expressServer.put('/users', (req, res) => {

    users.update(req.body, (code, returnObj) => {

        res.setHeader('Content-Type', 'application/json');
        res.status(code);
        res.send(returnObj);

    });

});


// Server Module.
const server = {};

server.run = () => {

    console.log('Kør server');
    const port = 3000;

    expressServer.listen(port, () => {

        console.log('Server er startet, lytter på http://localhost:' + port);

    });
    
};

module.exports = server;
