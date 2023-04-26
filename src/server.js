import Express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
require('dotenv').config();
import connectDB from "./config/connectDB";
import cors from 'cors';

// import dotenv from "dotenv";

let app = Express();
// app.use(cors({ origin: true }));
app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;
// port === undefined => port = 6969

app.listen(port, () => {
    // call back
    console.log("Backend Node Js is running on the port: " + port);
})