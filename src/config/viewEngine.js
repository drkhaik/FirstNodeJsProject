import Express from "express";

let configViewEngine = (app) => {
    app.use(Express.static("./src/public"));
    app.set("view engine", "ejs"); // jsp blade
    app.set("views", "./src/views");
}

module.exports = configViewEngine;