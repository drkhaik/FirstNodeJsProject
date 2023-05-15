import Express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";

let router = Express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/createUser', homeController.createUserGet);
    router.post('/createUserPost', homeController.createUserPost);
    router.get('/getUser', homeController.getUser);
    router.get('/editUser', homeController.editUser);
    router.post('/updateUser', homeController.updateUser);
    router.get('/deleteUser', homeController.deleteUser);

    // ----------- USER ------------ //
    router.post('/api/login', userController.handleLogin);
    router.get('/api/getUsers', userController.handleGetUsers);
    router.post('/api/createUser', userController.handleCreateUser);
    router.put('/api/editUser', userController.handleEditUser);
    router.delete('/api/deleteUser', userController.handleDeleteUser);

    router.get('/api/allcode', userController.getAllCode);

    // ----------- DOCTOR ------------ //
    router.get('/api/getOutstandingDoctor', doctorController.getOutstandingDoctor);
    router.get('/api/getAllDoctor', doctorController.getAllDoctor);
    router.post('/api/saveInfoDoctor', doctorController.saveInfoDoctor);

    // router.get('/hoidanIT', (req, res) => {
    //     return res.send("Hoi dan IT tai day");
    // });

    return app.use("/", router);
}

module.exports = initWebRoutes;