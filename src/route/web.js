import Express from "express";
import homeController from "../controllers/homeController";

let router = Express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/createUser', homeController.createUserGet);
    router.post('/createUserPost', homeController.createUserPost);
    router.get('/getUser', homeController.getUser);
    router.get('/editUser', homeController.editUser);
    router.post('/updateUser', homeController.updateUser);
    router.get('/deleteUser', homeController.deleteUser);
    // router.get('/hoidanIT', (req, res) => {
    //     return res.send("Hoi dan IT tai day");
    // });

    return app.use("/", router);
}

module.exports = initWebRoutes;