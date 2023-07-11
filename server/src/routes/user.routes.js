const { authJwt } = require("../middlewares");

const userController = require('../controllers/user.controller');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers', 
            "x-access-token, Origin, Content-Type, Accept"
        );
    });

    app.get('/api/test/all', userController.allAccess);

    app.get(
        '/api/test/user', 
        [authJwt.verifyToken], 
        userController.allAccess,
    );

    app.get(
        '/api/test/admin', 
        [authJwt.verifyToken, authJwt.isAdmin], 
        userController.adminBoard,
    );

    app.get(
        '/api/test/moderator', 
        [authJwt.verifyToken, authJwt.isModerator], 
        userController.moderatorBoard,
    );
}