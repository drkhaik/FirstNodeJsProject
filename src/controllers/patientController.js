import patientService from '../services/patientService'

let bookAnAppointment = async (req, res) => {
    try {
        let info = await patientService.bookAnAppointmentService(req.body);
        return res.status(200).json(info);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let verifyAnAppointment = async (req, res) => {
    try {
        let info = await patientService.verifyAnAppointmentService(req.body);
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
    bookAnAppointment: bookAnAppointment,
    verifyAnAppointment: verifyAnAppointment
}
