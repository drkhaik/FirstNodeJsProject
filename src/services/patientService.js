import db from "../models/index";
require('dotenv').config();
import emailService from "./emailService";
import { v4 as uuidv4 } from 'uuid';

let buildUrlEmail = (token, doctorId, timeType) => {
    let result = `${process.env.URL_REACT}/verify-booking/?token=${token}&doctorId=${doctorId}&time=${timeType}`
    return result;
}

let checkRequiredFields = (data) => {
    let arrField = ['fullName', 'email', 'phoneNumber', 'birthday', 'address', 'reason', 'gender', 'doctorId',
        'timeType', 'language', 'date', 'dateString', 'doctorName', 'addressClinic', 'nameClinic'];
    let isValid = true, element = '';
    for (let i = 0; i < arrField.length; i++) {
        if (!data[arrField[i]]) {
            isValid = false;
            element = arrField[i];
            break;
        }
    }
    return { isValid: isValid, element: element }
}

let bookAnAppointmentService = (dataAppointment) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log("check dataAppointment", dataAppointment);
            let checkValidate = checkRequiredFields(dataAppointment);
            if (checkValidate.isValid === false) {
                resolve({
                    errCode: 1,
                    message: `Missing required parameters! ${checkValidate.element}`,
                })
            } else {
                let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
                let address = `${dataAppointment.nameClinic} - ${dataAppointment.addressClinic}`;

                // insert to User table
                let patient = await db.Patient.findOne({
                    where: {
                        email: dataAppointment.email
                    }
                })
                if (patient) {
                    // has email in DB // find that email has status in S3 or not, then 
                    let bookingInfo = await db.Booking.findOne({
                        where: {
                            patientId: patient.id,
                            statusId: ["S1", "S2"],
                        }
                    })
                    if (bookingInfo) {
                        if (bookingInfo.statusId === 'S1') {
                            resolve({
                                errCode: 2,
                                message: "Oops! Your email currently has one unconfirmed appointment!. Try again later.",
                            })
                        }
                        if (bookingInfo.statusId === 'S2') {
                            resolve({
                                errCode: 3,
                                message: "Oops! Your email currently has another appointment in system.",
                            })
                        }
                    } else {
                        // send an email
                        await emailService.sendSimpleEmail({
                            receiverEmail: dataAppointment.email,
                            patientName: dataAppointment.fullName,
                            time: dataAppointment.dateString,
                            doctorName: dataAppointment.doctorName,
                            address: address,
                            language: dataAppointment.language,
                            redirectLink: buildUrlEmail(token, dataAppointment.doctorId, dataAppointment.timeType),
                        })
                        await db.Booking.create({
                            statusId: 'S1',
                            doctorId: dataAppointment.doctorId,
                            patientId: patient.id,
                            date: dataAppointment.date,
                            dateString: dataAppointment.dateString,
                            timeType: dataAppointment.timeType,
                            token: token

                        })
                        resolve({
                            errCode: 0,
                            message: 'Save info booking successful!'
                        })
                    }

                } else {
                    // send an email
                    await emailService.sendSimpleEmail({
                        receiverEmail: dataAppointment.email,
                        patientName: dataAppointment.fullName,
                        time: dataAppointment.dateString,
                        doctorName: dataAppointment.doctorName,
                        address: address,
                        language: dataAppointment.language,
                        redirectLink: buildUrlEmail(token, dataAppointment.doctorId, dataAppointment.timeType),
                    })
                    // create new one
                    await db.Patient.create({
                        fullName: dataAppointment.fullName,
                        email: dataAppointment.email,
                        address: dataAppointment.address ? dataAppointment.address : '',
                        phoneNumber: dataAppointment.phoneNumber,
                        gender: dataAppointment.gender,
                        birthday: dataAppointment.birthday,
                        reason: dataAppointment.reason,
                    })
                    // then create a new booking record
                    await db.Booking.create({
                        statusId: 'S1',
                        doctorId: dataAppointment.doctorId,
                        patientId: patient.id,
                        date: dataAppointment.date,
                        dateString: dataAppointment.dateString,
                        timeType: dataAppointment.timeType,
                        token: token
                    })
                    resolve({
                        errCode: 0,
                        message: 'Save info patient successful!'
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

// ============== MAIL ==========

let verifyAnAppointmentService = (dataQueryUrl) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log("check dataAppointment", dataAppointment);
            if (!dataQueryUrl.token || !dataQueryUrl.doctorId || !dataQueryUrl.timeType) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameters!'
                })
            } else {
                // reference to Booking table and compare doctorId, timeType and token from query Url with data in DB, 
                // if DB don't have a record same like that, create a new one, but if it already have 1 record and
                // status = S2, don't do anything
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: dataQueryUrl.doctorId,
                        token: dataQueryUrl.token,
                        timeType: dataQueryUrl.timeType,
                        statusId: 'S1',
                    },
                    raw: false // to use update function // if raw = true, it return to object of JS, not sequelize
                })
                if (appointment) {
                    appointment.statusId = 'S2';
                    await appointment.save();
                    resolve({
                        errCode: 0,
                        message: 'Confirm the Appointment Successful!'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        message: 'The Appointment has been activated or does not exist!'
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    bookAnAppointmentService: bookAnAppointmentService,
    verifyAnAppointmentService: verifyAnAppointmentService,
}