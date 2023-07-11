const db = require("../models");
const ROLES =  db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        userName: req.body.username
    }).exec((error, user) => {
        if(error) {
            console.log("Error in getting username,", error);
            return res.status(500).json({
                errMsg: error
            });
        }
        if(user) {
            return res.status(400).json({
                errMsg: "Failed username already exists!",
            });
        }
        User.findOne({
            email: req.body.email
        }).exec((error, user) => {
            if(error) {
                console.log("Error in getting email,", error);
                return res.status(500).json({
                    errMsg: error
                });
            }
            if(user) {
                return res.status(400).json({
                    errMsg: "Failed email already exists!",
                });
            }
        });
    });
    next();
};

const checkRoleExist = (req, res, next) => {
    if(req.body.roles) {
        for(let i = 0; i < req.body.roles.length; i++) {
            if(!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({
                    errMsg: `Failed! Role ${req.body.roles[i]} does not exist!`,
                });
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRoleExist,
}

module.exports = verifySignUp;