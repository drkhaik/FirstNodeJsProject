require('dotenv').config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Drkhaik 👻" <trinhkhai.dev@example.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: dataSend && dataSend.language === 'vi' ? "Thông tin đặt lịch khám bệnh" : "Appointment information!", // Subject line
        html: getBodyHtmlEmail(dataSend),
        // attachments: [{
        //     filename: `prescription-${dataSend.patientId}-${new Date().getTime()}.png`,
        //     content: dataSend.imgBase64.split("base64,")[1],
        //     encoding: 'base64'
        // }]
    });

}

let getBodyHtmlEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}! </h3>
        <p>Cảm ơn Anh/ Chị đã đặt lịch khám bệnh trên BookingCarePlus!
        Nhân sự thuộc bộ phận chăm sóc khách hàng sẽ liên lạc với anh/ chị vào thời gian sớm nhất theo số điện thoại liên lạc anh/ chị đã cung cấp.</p>
        <p>Thông tin đã đặt trong lịch khám bệnh của người bệnh như sau: </p>
        <div>Thời gian: <b> ${dataSend.time}     </b></div>
        <div>Địa điểm: <b> ${dataSend.address}     </b></div>
        <div>Bác sĩ khám: <b> ${dataSend.doctorName} </b></div>
        <br></br>
        <p> Vui lòng ấn vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh!</p>
        <a href=${dataSend.redirectLink} target="_blank" >Xác nhận đặt lịch!</a>
        </div>
        <div> Chân thành cảm ơn!</div>
        `
    }
    if (dataSend.language === 'en') {
        result = `
        <h3>Hello ${dataSend.patientName}! </h3>
        <p>Thank you for booking an appointment on BookingCarePlus! 
        Customer service personnel will contact you as soon as possible according to the contact number you have provided.</p>
        <p>The information filled in the medical examination schedule is as follows: </p>
        <div>Time: <b> ${dataSend.time} </b></div>
        <div>Address: <b> ${dataSend.address} </b></div>
        <div>Doctor: <b> ${dataSend.doctorName} </b></div>
        <br></br>
        <p> Please click on the link below to confirm and complete the booking process!</p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank" >Click here to confirm!</a>
        </div>
        
        <div> Sincerely thanks! </div>
        `
    }
    return result;
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}