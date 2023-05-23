import doctorService from "../services/doctorService";

let getOutstandingDoctor = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 11;
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

let getDetailDoctorById = async (req, res) => {
    try {
        let detailInfo = await doctorService.getDetailDoctorByIdService(req.query.id);
        return res.status(200).json(detailInfo);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let getDetailSectionDoctor = async (req, res) => {
    try {
        let detailSection = await doctorService.getDetailSectionDoctorService(req.query.id);
        return res.status(200).json(detailSection);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let saveScheduleInfo = async (req, res) => {
    try {
        let response = await doctorService.saveScheduleInfoService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let getScheduleInfoByDate = async (req, res) => {
    try {
        let detailSchedule = await doctorService.getScheduleInfoByDateService(req.query.doctorId, req.query.date);
        return res.status(200).json(detailSchedule);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

module.exports = {
    getOutstandingDoctor: getOutstandingDoctor,
    getAllDoctor: getAllDoctor,
    saveInfoDoctor: saveInfoDoctor,
    getDetailDoctorById: getDetailDoctorById,
    getDetailSectionDoctor: getDetailSectionDoctor,
    saveScheduleInfo: saveScheduleInfo,
    getScheduleInfoByDate: getScheduleInfoByDate,
}