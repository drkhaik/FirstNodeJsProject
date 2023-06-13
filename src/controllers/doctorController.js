import doctorService from "../services/doctorService";

let getOutstandingDoctor = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 12;
    try {
        // chuyen tu kieu string sang number
        let response = await doctorService.getOutstandingDoctor(+limit);
        // console.log('check response doctor Controller: ', response);
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

let getExtraInfoDoctorById = async (req, res) => {
    try {
        let extraInfoDoctor = await doctorService.getExtraInfoDoctorByIdService(req.query.doctorId);
        return res.status(200).json(extraInfoDoctor);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let getProfileDoctorById = async (req, res) => {
    try {
        let extraInfoDoctor = await doctorService.getProfileDoctorByIdService(req.query.doctorId);
        return res.status(200).json(extraInfoDoctor);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let getAddressClinicByDoctorId = async (req, res) => {
    try {
        let info = await doctorService.getAddressClinicByDoctorIdService(req.query.doctorId);
        return res.status(200).json(info);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let getListPatientForDoctor = async (req, res) => {
    try {
        let info = await doctorService.getListPatientForDoctorService(req.query.doctorId, req.query.date);
        return res.status(200).json(info);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let saveCompletedStatus = async (req, res) => {
    try {
        let info = await doctorService.saveCompletedStatusService(req.body);
        return res.status(200).json(info);
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
    getExtraInfoDoctorById: getExtraInfoDoctorById,

    getProfileDoctorById: getProfileDoctorById,
    getAddressClinicByDoctorId: getAddressClinicByDoctorId,
    getListPatientForDoctor: getListPatientForDoctor,
    saveCompletedStatus: saveCompletedStatus,
}