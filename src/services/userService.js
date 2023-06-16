import db from "../models/index";;
import bcrypt from 'bcryptjs';
import { createJWT } from '../middleware/JWTaction';
import jwt from "jsonwebtoken";
require("dotenv").config();

const salt = bcrypt.genSaltSync(10);

let generateAccessToken = (user) => {
    return jwt.sign({
        // id: user.id,
        role: user.roleId
    }, process.env.JWT_ACCESS_KEY,
        { expiresIn: "1d" }
    )
}

let generateRefreshToken = (user) => {
    return jwt.sign({
        // id: user.id,
        role: user.roleId
    }, process.env.JWT_REFRESH_KEY,
        { expiresIn: "30d" }
    )
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                // user already exist
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['id', 'email', 'roleId', 'password', 'firstName', 'lastName'],
                    raw: true,
                })
                if (user) {
                    // compare password
                    let checkPassword = await bcrypt.compareSync(password, user.password);
                    if (checkPassword) {
                        userData.errCode = 0;
                        userData.message = "Ok";
                        // userData.jwtKey = createJWT(); // then save in redux, verify
                        userData.accessToken = generateAccessToken(user)
                        userData.refreshToken = generateRefreshToken(user)
                        // delete password ko day ra phia client
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.message = "Wrong password!";
                    }
                } else {
                    userData.errCode = 2;
                    userData.message = "User not found";
                }
            } else {
                // return error
                userData.errCode = 1;
                userData.message = "Your Email isn't exist in your system. Plz try the other one!";
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    // except password
                    attributes: { exclude: ["password", "image"] },
                    limit: 10,
                    order: [
                        ['createdAt', 'DESC']
                    ],

                });
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: { exclude: ['password'] }
                })
            }
            resolve(users)

        } catch (e) {
            reject(e)
        }
    })
}

let createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email exist or not??
            let checkEmailExist = await checkUserEmail(data.email);
            if (checkEmailExist === true) {
                resolve({
                    errCode: 1,
                    message: "Your email is already in use! Try another!",
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.image,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                // let allUsers = getUsers();

                resolve({
                    errCode: 0,
                    message: "OK",
                })
            }


        } catch (e) {
            reject((e))
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.gender || !data.positionId) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters!'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (user) {
                // user.email = data.email;
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.gender = data.gender;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                if (data.image) {
                    user.image = data.image;
                }
                await user.save();
                // let allUsers = getAllUser();

                resolve({
                    errCode: 0,
                    message: `Update user information successful!`
                });
            } else {
                resolve({
                    errCode: 1,
                    message: `The user's not found!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findByPk(userId);
            if (user) {
                // await db.User.destroy({
                await db.User.findOne({
                    where: { id: userId }
                });
                // let allUsers = getAllUser();  
                resolve({
                    errCode: 0,
                    message: `The user is deleted!`,
                    user
                })
            } else {
                resolve({
                    errCode: 2,
                    message: `The user isn't exist!`
                }) // return
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    message: `Missing required parameters!`
                })
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0
                res.data = allcode
                resolve(res)
            }
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    handleUserLogin: handleUserLogin,
    getUsers: getUsers,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getAllCodeService: getAllCodeService,
}