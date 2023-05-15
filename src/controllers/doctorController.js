import doctorService from "../services/doctorService";

let getOutstandingDoctor = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        // chuyen tu kieu string sang number
        let response = await doctorService.getOutstandingDoctor(+limit);
        console.log('check response doctor Controller: ', response);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}
let getAllDoctor = async (req, res) => {
    try {
        let allDoctors = await doctorService.getAllDoctorService();
        return res.status(200).json(allDoctors)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let saveInfoDoctor = async (req, res) => {
    try {
        let response = await doctorService.saveInfoDoctorService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}
module.exports = {
    getOutstandingDoctor: getOutstandingDoctor,
    getAllDoctor: getAllDoctor,
    saveInfoDoctor: saveInfoDoctor
}