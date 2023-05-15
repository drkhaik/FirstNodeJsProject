import db from "../models/index";

let getOutstandingDoctor = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limit,
                where: { roleId: 'R2' },
                attributes: { exclude: ["password"] },
                // order: [['createdAt', 'DESC']],
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true,
            })
            resolve({
                errCode: 0,
                data: users,
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getAllDoctorService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: { exclude: ["password", "image"] },
            })
            resolve({
                errCode: 0,
                data: doctors,
            })
        } catch (e) {
            reject(e)
        }
    })

}

let saveInfoDoctorService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.contentHTML || !data.contentMarkdown) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameters!'
                })
            } else {
                await db.Detail_Section.create({
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    description: data.description,
                    doctorId: data.doctorId
                })
            }
            resolve({
                errCode: 0,
                message: "Save detail information succeed!"
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getOutstandingDoctor: getOutstandingDoctor,
    getAllDoctorService: getAllDoctorService,
    saveInfoDoctorService: saveInfoDoctorService,
}