const express = require('express');
const path = require('path');
const database = require('./middleware/database');
const expressServer = express();
const helpers = require('./helpers');
const users = require('./users');
const cors = require('cors');
const multer = require('multer');

expressServer.use(cors());
expressServer.use(express.static(path.join(__dirname, '../assets')));
expressServer.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        cb(null, path.join(__dirname, '../assets/images'));
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, 'profile_' + req.body.id + ext);
    }
});
const upload = multer({ storage: storage });


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

expressServer.post('/users/profile', upload.single('profile'), (req, res) => {


    let payload = {
        "id" : req.body.id,
        "profile" : req.file.filename
    };

    console.log('Uploading', payload);

    users.update(payload, (code, returnObj) => {

        res.setHeader('Content-Type', 'application/json');
        res.status(code);
        res.send(returnObj);

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
