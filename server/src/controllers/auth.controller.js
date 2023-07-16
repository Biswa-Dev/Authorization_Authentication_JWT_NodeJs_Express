const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../models');
const User = db.user;
const Role = db.role;
const config = require('../config');

const signup = async (req, res) => {
    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    try {
        const saveUser = await user.save();
        if (saveUser) {
            if (req.body.roles) {
                const roles = await Role.find({ name: { $in: req.body.roles } });
                if (roles) {
                    user.roles = roles.map(role => role._id);
                    const userSave = await user.save();
                    if (userSave) {
                        return res.status(201).json({
                            errMsg: `User created successfully.`,
                        });
                    }
                }
            } else {
                const roles = await Role.findOne({ name: "user" });
                if (roles) {
                    user.roles = [roles._id];
                    const userSave = await user.save();
                    if (userSave) {
                        res.status(201).json({
                            errMsg: `User created successfully.`,
                        });
                    }
                }
            }
        }
    } catch (err) {
        console.log("error in signup");
        console.log(err);
        return res.status(500).json({
            errMsg: `Something went wrong`,
        });
    }
}

const signin = async (req, res) => {
    try {
        if(!req.body.userName) {
            return res.status(400).json({
                errMsg: `userName field required`,
            });
        }
        const query = User.where({ userName: req.body.userName })
        const user = await query.findOne().populate("roles", "-__v");
        if (!user) {
            return res.status(404).json({
                errMsg: `User not found!`,
            });
        }
        const isPasswordValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!isPasswordValid) {
            return res.status(401).json({
                accessToken: null,
                errMsg: `Invalid password`,
            });
        }
        const token = jwt.sign({ id: user.id }, config.jwtSecret, {
            expiresIn: config.jwtExpiryTime,
        });
        const authorities = [];
        for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200).json({
            id: user._id,
            userName: user.userName,
            email: user.email,
            roles: authorities,
            accessToken: token,
            accessTokenValidityInSec: config.jwtExpiryTime,
        });
    } catch (err) {
        return res.status(500).json({
            errMsg: `Unable to connect database!`,
        });
    }
}

module.exports = {
    signup,
    signin,
}