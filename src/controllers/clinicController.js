import clinicService from '../services/clinicService'

let createNewClinic = async (req, res) => {
    try {
        let info = await clinicService.createNewClinicService(req.body);
        return res.status(200).json(info);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let getAllClinic = async (req, res) => {
    try {
        let info = await clinicService.getAllClinicService();
        return res.status(200).json(info);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let getDetailClinicById = async (req, res) => {
    try {
        let info = await clinicService.getDetailClinicByIdService(req.query.id);
        return res.status(200).json(info);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let deleteClinicById = async (req, res) => {
    try {
        let info = await clinicService.deleteClinicService(req.query.id);
        return res.status(200).json(info);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let getAllClinicName = async (req, res) => {
    try {
        let info = await clinicService.getAllClinicNameService();
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
    createNewClinic: createNewClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById,
    deleteClinicById: deleteClinicById,
    getAllClinicName: getAllClinicName,
}