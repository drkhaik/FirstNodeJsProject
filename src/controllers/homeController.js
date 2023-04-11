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
    let message = await CRUDservice.createNewUser(req.body);
    console.log(message)
    return res.send("Post CRUD from server");
}

let getUser = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    return res.render("DisplayUser.ejs", {
        data: data
    });
}

module.exports = {
    getHomePage: getHomePage,
    createUserGet: createUserGet,
    createUserPost: createUserPost,
    getUser: getUser,
}