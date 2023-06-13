import Express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";

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
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
    router.get('/api/get-detail-section-doctor', doctorController.getDetailSectionDoctor);
    router.post('/api/save-schedule-info', doctorController.saveScheduleInfo);
    router.get('/api/get-schedule-info-by-date', doctorController.getScheduleInfoByDate);
    router.get('/api/get-extra-info-doctor-by-id', doctorController.getExtraInfoDoctorById);
    router.get(`/api/get-profile-doctor-by-id`, doctorController.getProfileDoctorById);
    router.get('/api/get-address-clinic-by-doctorId', doctorController.getAddressClinicByDoctorId);
    router.get(`/api/get-list-patient-for-doctor`, doctorController.getListPatientForDoctor);
    router.put(`/api/save-completed-status`, doctorController.saveCompletedStatus);

    // ----------- PATIENT ------------ //
    router.post('/api/patient-book-an-appointment', patientController.bookAnAppointment);
    router.post('/api/verify-an-appointment', patientController.verifyAnAppointment);

    // ----------- SPECIALTY ------------ //
    router.post('/api/create-new-specialty', specialtyController.createNewSpecialty);
    router.get('/api/get-all-specialty', specialtyController.getAllSpecialty);
    router.get('/api/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById);
    router.get('/api/delete-specialty-by-id', specialtyController.deleteSpecialtyById);


    // ----------- CLINIC ------------ //
    router.post('/api/create-new-clinic', clinicController.createNewClinic);
    router.get('/api/get-all-clinic', clinicController.getAllClinic);
    router.get('/api/get-detail-clinic-by-id', clinicController.getDetailClinicById);
    router.get('/api/delete-clinic-by-id', clinicController.deleteClinicById);


    // router.get('/hoidanIT', (req, res) => {
    //     return res.send("Hoi dan IT tai day");
    // });

    return app.use("/", router);
}

module.exports = initWebRoutes;