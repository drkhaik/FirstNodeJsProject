import specialtyService from '../services/specialtyService'

let createNewSpecialty = async (req, res) => {
    try {
        let info = await specialtyService.createNewSpecialtyService(req.body);
        return res.status(200).json(info);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let getAllSpecialty = async (req, res) => {
    try {
        let info = await specialtyService.getAllSpecialtyServices();
        return res.status(200).json(info);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let getDetailSpecialtyById = async (req, res) => {
    try {
        let info = await specialtyService.getDetailSpecialtyByIdService(req.query.id, req.query.location);
        return res.status(200).json(info);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let deleteSpecialtyById = async (req, res) => {
    try {
        let info = await specialtyService.deleteSpecialtyService(req.query.id);
        return res.status(200).json(info);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let getAllSpecialtyName = async (req, res) => {
    try {
        let info = await specialtyService.getAllSpecialtyNameService();
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
    createNewSpecialty: createNewSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById,
    deleteSpecialtyById: deleteSpecialtyById,
    getAllSpecialtyName: getAllSpecialtyName
}