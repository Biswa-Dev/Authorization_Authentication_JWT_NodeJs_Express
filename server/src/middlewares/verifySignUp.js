const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const userName = await User.findOne({ userName: req.body.username }).exec();
        if (userName) {
            return res.status(400).json({
                errMsg: "Failed username already exists!",
            });
        }
        const email = await User.findOne({ email: req.body.email }).exec();
        if (email) {
            return res.status(400).json({
                errMsg: "Failed email already exists!",
            });
        }
    } catch (error) {
        console.log("Error in getting username,", error);
        return res.status(500).json({
            errMsg: error
        });
    }
    next();
};

const checkRoleExist = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
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