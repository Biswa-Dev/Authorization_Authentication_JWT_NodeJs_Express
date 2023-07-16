const jwt = require('jsonwebtoken');
const config = require('../config');

const db = require('../models');
const User = db.user;
const Role = db.role;

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).json({
            errMsg: 'Forbidden!',
        });
    }
    jwt.verify(token, config.jwtSecret, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                errMsg: 'Unauthorized!',
            });
        }
        req.userId = decoded.id;
        next();
    });
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).exec();
        if (user) {
            const roles = await Role.find({ _id: { $in: user.roles } });
            if (roles) {
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }
                res.status(403).send({ errMsg: "Require Admin Role!" });
                return;
            }
        }
    } catch (error) {
        return res.status(500).json({ errMsg: error });
    }
};

const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId).exec();
    if(user) {
        const roles = await Role.find({ _id: { $in: user.roles } });
        if(roles) {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }
            res.status(403).send({ errMsg: "Require Moderator Role!" });
            return;
        }
    }
};

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
}

module.exports = authJwt;