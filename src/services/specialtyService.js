import db from "../models/index";

let createNewSpecialtyService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("check data from server", data)
            if (data.action === 'CREATE') {
                await db.Specialty.create({
                    name: data.nameSpecialty,
                    image: data.image,
                    descriptionMarkdown: data.descriptionMarkdown,
                    descriptionHTML: data.descriptionHTML,
                })
            } else if (data.action === 'EDIT') {
                let specialty = await db.Specialty.findOne({
                    where: { id: data.specialtyId },
                    raw: false
                })
                if (specialty) {
                    specialty.name = data.nameSpecialty;
                    specialty.descriptionMarkdown = data.descriptionMarkdown;
                    specialty.descriptionHTML = data.descriptionHTML;
                    if (data.image) {
                        specialty.image = data.image;
                    }
                    specialty.updateAt = new Date();
                    await specialty.save();
                }
            }
            resolve({
                errCode: 0,
                message: "Save information of Specialty Successfully!"
            })
        } catch (e) {
            reject(e);
        }
    })
}

let deleteSpecialtyService = (specialtyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Specialty.findByPk(specialtyId);
            if (user) {
                await db.Specialty.destroy({
                    where: { id: specialtyId }
                });
                // let allUsers = getAllUser();  
                resolve({
                    errCode: 0,
                    message: `The Specialty is deleted!`
                })
            } else {
                resolve({
                    errCode: 2,
                    message: `The Specialty isn't exist!`
                }) // return
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllSpecialtyServices = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log("check dataAppointment", dataAppointment);

            let data = await db.Specialty.findAll(
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

let getDetailSpecialtyByIdService = (specialtyId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!specialtyId || !location) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameters!'
                })
            } else {
                let data = await db.Specialty.findOne({
                    where: { id: specialtyId },
                    attributes: ["descriptionHTML", "descriptionMarkdown", "name", "image"],
                });

                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }

                if (data) {
                    let doctorSpecialty = [];
                    if (location === 'ALL') {
                        doctorSpecialty = await db.Doctor_Info.findAll({
                            where: { specialtyId: specialtyId },
                            attributes: ['doctorId', 'provinceId']
                        })
                    } else {
                        // find by location
                        doctorSpecialty = await db.Doctor_Info.findAll({
                            where: { specialtyId: specialtyId, provinceId: location },
                            attributes: ['doctorId', 'provinceId']
                        })
                    }
                    data.doctorSpecialty = doctorSpecialty;
                    // data = {descriptionHTML,descriptionMarkdown, name,{doctorSpecialty}}
                } else {
                    data = {}
                }
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
    createNewSpecialtyService: createNewSpecialtyService,
    getAllSpecialtyServices: getAllSpecialtyServices,
    getDetailSpecialtyByIdService: getDetailSpecialtyByIdService,
    deleteSpecialtyService: deleteSpecialtyService,
}