const fs = require('fs/promises');

const helpers = {};


helpers.readFile = async (file) => {

    return fs.readFile('./data/' + file, 'utf8', (err, data) => {

        return data;

    });

};


module.exports = helpers;