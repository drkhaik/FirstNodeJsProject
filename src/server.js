import Express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
require('dotenv').config();
import connectDB from "./config/connectDB";
import cors from "cors";
// import cors from 'cors';

// import dotenv from "dotenv";

let app = Express();
// app.use(cors({ origin: true }));
// app.use(cors({ credentials: true, origin: true }));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);
    res.header('Access-Control-Allow-Origin', process.env.URL_REACT);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type', 'Authorization');
    res.header('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;
// port === undefined => port = 6969

app.listen(port, () => {
    // call back
    console.log("Backend Node Js is running on the port: " + port);
})