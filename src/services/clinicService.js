import db from "../models/index";

let createNewClinicService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("check data from server", data)
            if (data.action === 'CREATE') {
                await db.Clinic.create({
                    name: data.nameClinic,
                    address: data.address,
                    note: data.note,
                    backgroundImage: data.backgroundImage,
                    descriptionMarkdown: data.descriptionMarkdown,
                    descriptionHTML: data.descriptionHTML,
                    strength_equipmentMarkdown: data.strength_equipmentMarkdown,
                    strength_equipmentHTML: data.strength_equipmentHTML,
                    image: data.image,

                })
            } else if (data.action === 'EDIT') {
                let clinic = await db.Clinic.findOne({
                    where: { id: data.clinicId },
                    raw: false
                })
                if (clinic) {
                    clinic.name = data.nameClinic;
                    clinic.address = data.address;
                    clinic.note = data.note;
                    clinic.backgroundImage = data.backgroundImage;
                    clinic.descriptionMarkdown = data.descriptionMarkdown;
                    clinic.descriptionHTML = data.descriptionHTML;
                    clinic.strength_equipmentMarkdown = data.strength_equipmentMarkdown;
                    clinic.strength_equipmentHTML = data.strength_equipmentHTML;
                    if (data.image) {
                        clinic.image = data.image;
                    }
                    clinic.updateAt = new Date();
                    await clinic.save();
                }
            }
            resolve({
                errCode: 0,
                message: "Save information of Clinic Successfully!"
            })
        } catch (e) {
            reject(e);
        }
    })
}

let deleteClinicService = (clinicId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Clinic.findByPk(clinicId);
            if (user) {
                await db.Clinic.destroy({
                    where: { id: clinicId }
                });
                // let allUsers = getAllUser();  
                resolve({
                    errCode: 0,
                    message: `The Clinic is deleted!`
                })
            } else {
                resolve({
                    errCode: 2,
                    message: `The Clinic isn't exist!`
                }) // return
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllClinicService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log("check dataAppointment", dataAppointment);

            let data = await db.Clinic.findAll(
                // { attributes: { exclude: ["image"] }, }
            );
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
                // console.log("hoi dan it check data node js", data)
            }
            resolve({
                errCode: 0,
                message: 'Ok',
                data
            })

        } catch (e) {
            reject(e);
        }
    })
}

let getDetailClinicByIdService = (clinicId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!clinicId) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameters!'
                })
            } else {
                let data = await db.Clinic.findOne({
                    where: { id: clinicId },
                    attributes: { exclude: ["id", "createdAt", "updatedAt"] }
                });

                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (data) {
                    let doctorOfClinic = [];
                    doctorOfClinic = await db.Doctor_Info.findAll({
                        where: { clinicId: clinicId },
                        attributes: ['doctorId']
                    })
                    data.doctorOfClinic = doctorOfClinic;
                } else {
                    data = {};
                }
                // console.log("check data clinic", data)
                resolve({
                    errCode: 0,
                    message: 'Ok',
                    data
                })

            }

        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    createNewClinicService: createNewClinicService,
    getAllClinicService: getAllClinicService,
    getDetailClinicByIdService: getDetailClinicByIdService,
    deleteClinicService: deleteClinicService,
}