const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../models');
const User = db.user;
const Role = db.role;
const config = require('../config');

exports.signup = async (req, res) => {
    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    try {
        const saveUser = await user.save();
        if (saveUser) {
            if (req.body.roles) {
                Role.find(
                    {
                        name: { $in: req.body.roles }
                    },
                    (error, roles) => {
                        if (error) {
                            return res.status(500).json({
                                errMsg: `Something went wrong!`,
                            });
                        }
                        user.roles = roles.map(role => role._id);
                        user.save().
                            then(() => {
                                res.status(201).json({
                                    errMsg: `User created successfully.`,
                                });
                            }).
                            catch(err => {
                                return res.status(500).json({
                                    errMsg: `Unable to set role: ${error}`,
                                });
                            })
                    }
                );
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errMsg: `Unable to create user in db: ${error}`,
        });
    }


    user.save().
        then(() => {
            if (req.body.roles) {
                Role.find(
                    {
                        name: { $in: req.body.roles }
                    },
                    (error, roles) => {
                        if (error) {
                            return res.status(500).json({
                                errMsg: `Something went wrong!`,
                            });
                        }
                        user.roles = roles.map(role => role._id);
                        user.save().
                            then(() => {
                                res.status(201).json({
                                    errMsg: `User created successfully.`,
                                });
                            }).
                            catch(err => {
                                return res.status(500).json({
                                    errMsg: `Unable to set role: ${error}`,
                                });
                            });
                        // user.save(error => {
                        //     if (error) {
                        //         return res.status(500).json({
                        //             errMsg: `Unable to set role: ${error}`,
                        //         });
                        //     }
                        //     res.status(201).json({
                        //         errMsg: `User created successfully.`,
                        //     });
                        // });
                    }
                )
            } else {
                Role.findOne({ name: "user" }, (error, role) => {
                    if (error) {
                        return res.status(500).json({
                            errMsg: `Something went wrong!`,
                        });
                    }
                    user.roles = [role._id];
                    user.save().
                        then(() => {
                            res.status(201).json({
                                errMsg: `User created successfully.`,
                            });
                        }).
                        catch(err => {
                            return res.status(500).json({
                                errMsg: `Unable to set role: ${error}`,
                            });
                        });
                    // user.save(error => {
                    //     if (error) {
                    //         return res.status(500).json({
                    //             errMsg: `Unable to set role: ${error}`,
                    //         });
                    //     }
                    //     res.status(201).json({
                    //         errMsg: `User created successfully.`,
                    //     });
                    // });
                });
            }
        }).
        catch(err => {
            return res.status(500).json({
                errMsg: `Unable to create user in db: ${error}`,
            });
        });

    // user.save((error, user) => {
    //     if (error) {
    //         return res.status(500).json({
    //             errMsg: `Unable to create user in db: ${error}`,
    //         });
    //     }
    //     if (req.body.roles) {
    //         Role.find(
    //             {
    //                 name: { $in: req.body.roles }
    //             },
    //             (error, roles) => {
    //                 if (error) {
    //                     return res.status(500).json({
    //                         errMsg: `Something went wrong!`,
    //                     });
    //                 }
    //                 user.roles = roles.map(role => role._id);
    //                 user.save(error => {
    //                     if (error) {
    //                         return res.status(500).json({
    //                             errMsg: `Unable to set role: ${error}`,
    //                         });
    //                     }
    //                     res.status(201).json({
    //                         errMsg: `User created successfully.`,
    //                     });
    //                 });
    //             }
    //         )
    //     } else {
    //         Role.findOne({ name: "user" }, (error, role) => {
    //             if (error) {
    //                 return res.status(500).json({
    //                     errMsg: `Something went wrong!`,
    //                 });
    //             }
    //             user.roles = [role._id];
    //             user.save(error => {
    //                 if (error) {
    //                     return res.status(500).json({
    //                         errMsg: `Unable to set role: ${error}`,
    //                     });
    //                 }
    //                 res.status(201).json({
    //                     errMsg: `User created successfully.`,
    //                 });
    //             });
    //         });
    //     }
    // });
}

exports.signin = (req, res) => {
    User.findOne({
        userName: req.body.userName
    }).populate("roles", "-__v")
        .exec((error, user) => {
            if (error) {
                return res.status(500).json({
                    errMsg: `Unable to connect database!`,
                });
            }
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
                expiresIn: 300,
            });
            const authorities = [];
            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
            res.status(200).json({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token,
                accessTokenValidityInSec: 300,
            });
        });
}