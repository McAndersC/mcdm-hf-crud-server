const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const database = {};

database.connect = () => {

    mongoose.connect('mongodb://127.0.0.1:27017/CrudHF')
    .then( () => {

        console.log('Database kontakt etableret.');

    })
    .catch((error) => {

        console.log('Database kontakt fejlede');
        console.log(error);
        process.exit(1);

    });
};

module.exports = database;