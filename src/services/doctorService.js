import db from "../models/index";
require('dotenv').config();
import _ from 'lodash'

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

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
            // data = JSON.stringify([data]);
            // data = JSON.parse(data);
            console.log("check data 10:40", data)
            // console.log("data from server", data)
            // data.map((item) => {
            //     console.log("check item", item)
            // if(data.item === "" || data.item === null)
            //     if (item === '' || item === null) {
            //         resolve({
            //             errCode: 1,
            //             message: 'Missing required parameters!'
            //         })
            //         return;
            //     }
            // });
            // console.log("from sever, test Ok")

            // let schedule = scheduleInfo.arrSchedule;
            // if (schedule && schedule.length > 0) {
            //     schedule = schedule.map(item => {
            //         item.maxNumber = MAX_NUMBER_SCHEDULE;
            //         return item;
            //     })
            // }
            // for(let i = 0; i < 11; i ++){
            //     if(data.length)
            // }
            // if (data && data.length > 0) {
            //     data = data.map(item => {
            //         return console.log("console log item", data.item);

            //     })
            // }    
            // console.log("so luong phan tu", Object.keys(data).length)
            // if (Object.keys(data).length < 11) {
            //     resolve({
            //         errCode: 1,
            //         message: 'Missing required parameters!'
            //     })
            // }
            // return true;
            if (!data.doctorId || !data.contentHTML || !data.contentMarkdown || !data.actions || !data.description
                || !data.selectedPrice || !data.selectedPayment || !data.selectedProvince || !data.nameClinic
                || !data.addressClinic || !data.note) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameters!'
                })
            }
            else {
                // insert or update Detail Section
                if (data.actions === 'CREATE') {
                    await db.Detail_Section.create({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                        doctorId: data.doctorId
                    })
                } else if (data.actions === 'EDIT') {
                    let doctor = await db.Detail_Section.findOne({
                        where: { doctorId: data.doctorId },
                        raw: false
                    })
                    if (doctor) {
                        doctor.contentHTML = data.contentHTML;
                        doctor.contentMarkdown = data.contentMarkdown;
                        doctor.description = data.description;
                        doctor.updateAt = new Date();
                        await doctor.save();
                    }
                }

                // insert or update Detail Info of Doctor
                let doctorInfo = await db.Doctor_Info.findOne({
                    where: {
                        doctorId: data.doctorId,
                    },
                    raw: false
                })
                if (doctorInfo) {
                    // update
                    doctorInfo.priceId = data.selectedPrice;
                    doctorInfo.paymentId = data.selectedPayment;
                    doctorInfo.provinceId = data.selectedProvince;
                    doctorInfo.nameClinic = data.nameClinic;
                    doctorInfo.addressClinic = data.addressClinic;
                    doctorInfo.note = data.note;
                    doctorInfo.updateAt = new Date();
                    await doctorInfo.save();
                } else {
                    // create
                    await db.Doctor_Info.create({
                        doctorId: data.doctorId,
                        priceId: data.selectedPrice,
                        paymentId: data.selectedPayment,
                        provinceId: data.selectedProvince,
                        nameClinic: data.nameClinic,
                        addressClinic: data.addressClinic,
                        note: data.note,
                    })
                }
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

let getDetailDoctorByIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // errorBoundary
            if (!id) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameters!'
                })
            } else {
                let data = await db.User.findOne({
                    where: { id: id },
                    attributes: { exclude: ["password"] },
                    include: [
                        { model: db.Detail_Section, attributes: ['contentHTML', 'contentMarkdown', 'description'] },
                        // { model: db.Detail_Section },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.Doctor_Info,
                            attributes: {
                                exclude: ['id', 'doctorId'],
                            },
                            include: [
                                { model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi'] },
                            ]
                        }
                    ],
                    raw: false,
                    nest: true,
                })

                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getDetailSectionDoctorService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // errorBoundary
            if (!id) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameters!'
                })
            } else {
                let data = await db.Detail_Section.findOne({
                    where: { doctorId: id },
                    // attributes: { exclude: ["password"] },
                    raw: false,
                    nest: true,
                })

                if (!data) data = null;
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let saveScheduleInfoService = (scheduleInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!scheduleInfo.arrSchedule || !scheduleInfo.doctorId || !scheduleInfo.date) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameters!"
                })
            } else {
                let schedule = scheduleInfo.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    })
                }
                // console.log("check schedule node js", schedule);

                // get all existing data in DB
                let existingDataInDB = await db.Schedule.findAll({
                    where: { doctorId: scheduleInfo.doctorId, date: scheduleInfo.date },
                    attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                    raw: true,
                })
                // convert Date from DB to compare
                // if (existingDataInDB && existingDataInDB.length > 0) {
                //     existingDataInDB = existingDataInDB.map(item => {
                //         item.date = new Date(item.date).setHours(0, 0, 0, 0);
                //         return item;
                //     })
                // }
                console.log("check in DB", existingDataInDB)
                console.log("check create", schedule)
                // compare two array
                let arrAfterCompare = _.differenceWith(schedule, existingDataInDB, (a, b) => {
                    // them dau cong truoc chuoi de bien chuoi thanh so vd: a = '5', b = +a (b=5) 
                    return a.timeType === b.timeType && +a.date === +b.date
                })

                // console.log('check compare: ', arrAfterCompare)
                if (arrAfterCompare && arrAfterCompare.length > 0) {
                    await db.Schedule.bulkCreate(arrAfterCompare)
                }

                resolve({
                    errCode: 0,
                    message: "Save schedule information succeed!"
                })
            }

        } catch (e) {
            reject(e)
        }
    })

}

let getScheduleInfoByDateService = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            // errorBoundary
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameters!'
                })
            } else {
                let data = await db.Schedule.findAll({
                    where: { doctorId: doctorId, date: date },
                    include: [
                        { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.User, as: 'doctorData', attributes: ['firstName', 'lastName'] },

                    ],
                    raw: true,
                    nest: true,
                })

                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getExtraInfoDoctorByIdService = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // errorBoundary
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameters!'
                })
            } else {
                let data = await db.Doctor_Info.findOne({
                    where: { doctorId: doctorId },
                    attributes: { exclude: ["id", "doctorId"] },
                    include: [
                        { model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: true,
                    nest: true,
                })

                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getProfileDoctorByIdService = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // errorBoundary
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameters!'
                })
            } else {
                let data = await db.User.findOne({
                    where: { id: doctorId },
                    attributes: { exclude: ["password", 'createdAt', 'updatedAt', 'phoneNumber', 'gender', 'address'] },
                    include: [
                        { model: db.Detail_Section, attributes: ['description'] },
                        // { model: db.Detail_Section },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.Doctor_Info,
                            attributes: {
                                exclude: ['id', 'doctorId', 'createdAt', 'updatedAt', 'count'],
                            },
                            include: [
                                { model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi'] },
                            ]
                        }
                    ],
                    raw: false,
                    nest: true,
                })

                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getOutstandingDoctor: getOutstandingDoctor,
    getAllDoctorService: getAllDoctorService,
    saveInfoDoctorService: saveInfoDoctorService,
    getDetailDoctorByIdService: getDetailDoctorByIdService,
    getDetailSectionDoctorService: getDetailSectionDoctorService,
    saveScheduleInfoService: saveScheduleInfoService,
    getScheduleInfoByDateService: getScheduleInfoByDateService,
    getExtraInfoDoctorByIdService: getExtraInfoDoctorByIdService,

    getProfileDoctorByIdService: getProfileDoctorByIdService,
}
