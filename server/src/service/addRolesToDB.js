const db = require('../models/index');

function addRolesToDB() {
    const Role = db.role;

    // Role.estimatedDocumentCount((error, count) => {
    //     if (!error && count === 0) {
    //         new Role({
    //             name: 'user'
    //         }).save(error => {
    //             if (error)
    //                 console.log('Error while adding user role,', error);
    //             console.log("User role added successfully.");
    //         });
    //         new Role({
    //             name: 'admin'
    //         }).save(error => {
    //             if (error)
    //                 console.log('Error while adding admin role,', error);
    //             console.log("Admin role added successfully.");
    //         });
    //         new Role({
    //             name: 'moderator'
    //         }).save(error => {
    //             if (error)
    //                 console.log('Error while adding moderator role,', error);
    //             console.log("Moderator role added successfully.");
    //         });
    //     }
    // });

    Role.estimatedDocumentCount()
        .then(count => {
            if (count === 0) {
                new Role({
                    name: 'user'
                }).save().then(() => {
                    console.log("User role added successfully.");
                }).catch(error => {
                    console.log('Error while adding user role,', error);
                });
                new Role({
                    name: 'admin'
                }).save().then(() => {
                    console.log("Admin role added successfully.");
                }).catch(error => {
                    console.log('Error while adding admin role,', error);
                });
                new Role({
                    name: 'moderator'
                }).save().then(() => {
                    console.log("Moderator role added successfully.");
                }).catch(error => {
                    console.log('Error while adding moderator role,', error);
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
}

module.exports = addRolesToDB;