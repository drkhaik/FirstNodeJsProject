import handbookService from '../services/handbookService';

let createNewHandbook = async (req, res) => {
    try {
        let info = await handbookService.createNewHandbookService(req.body);
        return res.status(200).json(info);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let getAllHandbook = async (req, res) => {
    try {
        let info = await handbookService.getAllHandbookService();
        return res.status(200).json(info);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let getDetailHandbookById = async (req, res) => {
    try {
        let info = await handbookService.getDetailHandbookByIdService(req.query.id);
        return res.status(200).json(info);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let deleteHandbookById = async (req, res) => {
    try {
        let info = await handbookService.deleteHandbookService(req.query.id);
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
    createNewHandbook: createNewHandbook,
    getAllHandbook: getAllHandbook,
    getDetailHandbookById: getDetailHandbookById,
    deleteHandbookById: deleteHandbookById,
}