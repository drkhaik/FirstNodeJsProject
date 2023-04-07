import Express from "express";
import homeController from "../controllers/homeController";

let router = Express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/test', homeController.testEjs);

    router.get('/hoidanIT', (req, res) => {
        return res.send("Hoi dan IT tai day");
    });

    return app.use("/", router);
}

module.exports = initWebRoutes;