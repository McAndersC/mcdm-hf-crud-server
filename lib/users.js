const users = {};
const UserModel = require('./model/user.model');

users.create = (payload, callback) => {

    console.log('Payload', payload);

    let query = {'email' : payload.email};

    UserModel.findOne(query).then( (result) => {

        console.log('Fandt vi en bruger?',  result);

        if(!result) {

            UserModel.create(payload).then( () => {

                callback(201, {'message' : 'Bruger er oprettet. Sådan Anders du kan'});
        
            });

        } else {

                callback(200, {'message' : 'Bruger kan ikke oprettes'});

        }

    });

};

users.read = (callback) => {

    UserModel.find({}).then( (users) => {

        callback(200, {'message' : 'Vi henter én bruger', 'userlist' : users});

    });

};

users.delete = (payload, callback) => {

    let query = {'email' : payload.email};

    UserModel.findOne(query).then( (user) => {

        console.log('Fandt vi en sbruger?',  user);

        if(user)
        {
            UserModel.deleteOne(query).then( (result) => {

                console.log(result);
                callback(200, {'message' : 'Bruger er slettet.'});
                
            });

        } else {
            callback(200, {'message' : 'Bruger kunne ikke slettes'});
        }
     

    });

};

module.exports = users;