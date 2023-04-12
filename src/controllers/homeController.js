import db from "../models/index";
import CRUDservice from "../services/CRUDservice";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render("homePage.ejs", {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
}

let createUserGet = (req, res) => {
    return res.render("CreateUser.ejs");
}

let createUserPost = async (req, res) => {
    let allUsers = await CRUDservice.createNewUser(req.body);

    return res.render("DisplayUser.ejs", {
        data: allUsers
    });
}

let getUser = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    return res.render("DisplayUser.ejs", {
        data: data
    });
}

let editUser = async (req, res) => {
    console.log(req.query.id);
    let userId = req.query.id;
    if (userId) {
        let userInfo = await CRUDservice.getUserInfoById(userId);
        return res.render("EditUser.ejs", {
            userInfo: userInfo
        })
    } else {
        return res.send("Users not found!")

    }
}

let updateUser = async (req, res) => {
    let newUserInfo = req.body;
    // let userId = req.body.id;
    let allUsers = await CRUDservice.updateUserInfo(newUserInfo);
    return res.render("DisplayUser.ejs", {
        data: allUsers
    });
}

let deleteUser = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let allUsers = await CRUDservice.deleteUserById(userId);
        return res.render("DisplayUser.ejs", {
            data: allUsers
        });
    } else {
        return res.send("User not found!")
    }
}

module.exports = {
    getHomePage: getHomePage,
    createUserGet: createUserGet,
    createUserPost: createUserPost,
    getUser: getUser,
    editUser: editUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
}