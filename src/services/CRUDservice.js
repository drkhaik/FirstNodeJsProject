import bcrypt from 'bcryptjs';
import db from "../models/index";



const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender,
                image: null,
                roleId: data.role,
                positionId: null,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            let allUsers = getAllUser();

            resolve(allUsers)

        } catch (e) {
            reject(e);
        }
    });

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

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                // raw: true,
            });
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findByPk(userId, {
                raw: true
            });
            // let user = await db.User.findOne({
            //     where: { id: userId },
            //     raw: true
            // });
            if (user) {
                resolve(user)
            } else {
                resolve([])
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateUserInfo = (newUserInfo) => {
    console.log(newUserInfo)
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findByPk(newUserInfo.id)
            if (user) {
                user.email = newUserInfo.email;
                user.firstName = newUserInfo.firstName;
                user.lastName = newUserInfo.lastName;
                user.address = newUserInfo.address;
                user.phoneNumber = newUserInfo.phoneNumber;
                await user.save();

                // let allUsers = await db.User.findAll();
                let allUsers = getAllUser();

                resolve(allUsers);
            } else {
                resolve()
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findByPk(userId);
            if (user) {
                await user.destroy();
                let allUsers = getAllUser();
                resolve(allUsers)
            } else {
                resolve() // return
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserInfo: updateUserInfo,
    deleteUserById: deleteUserById,
}