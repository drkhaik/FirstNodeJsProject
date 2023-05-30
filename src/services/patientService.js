import db from "../models/index";
require('dotenv').config();
import emailService from "./emailService";
import { v4 as uuidv4 } from 'uuid';

let buildUrlEmail = (token, doctorId, timeType) => {
    let result = `${process.env.URL_REACT}/verify-booking/?token=${token}&doctorId=${doctorId}&time=${timeType}`
    return result;
}

let bookAnAppointmentService = (dataAppointment) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log("check dataAppointment", dataAppointment);
            if (!dataAppointment.email || !dataAppointment.doctorId || !dataAppointment.date
                || !dataAppointment.fullName) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameters!'
                })
            } else {
                // resolve({
                //     dataAppointment
                // })

                // return;
                let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

                await emailService.sendSimpleEmail({
                    receiverEmail: dataAppointment.email,
                    patientName: dataAppointment.fullName,
                    time: dataAppointment.date,
                    doctorName: dataAppointment.doctorName,
                    language: dataAppointment.language,
                    redirectLink: buildUrlEmail(token, dataAppointment.doctorId, dataAppointment.timeType),
                })


                // insert to User table
                let user = await db.User.findOrCreate({
                    where: { email: dataAppointment.email },
                    defaults: {
                        email: dataAppointment.email,
                        roleId: 'R3'
                    },
                });
                console.log(">>>>>> drkhaik check info patient", user[0])
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: dataAppointment.doctorId,
                            patientId: user[0].id,
                            date: dataAppointment.date,
                            timeType: dataAppointment.timeType,
                            token: token
                        },
                    })
                    // console.log("check example", example)
                }
                // create a booking record
                resolve({
                    errCode: 0,
                    message: 'Save info patient successful!'
                })
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