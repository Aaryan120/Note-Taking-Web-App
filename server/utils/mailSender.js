const NodeMailer = require("nodemailer");
require("dotenv").config();


const mailSender = async (email,title,body) =>{
    // console.log("PRINTING EMAIL",email);
    // console.log("PRINTING TITLE",title);
    // console.log("PRINTING BODY",body);
    try {
        let transporter = NodeMailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        let info = await transporter.sendMail({
            from:"Tars Note Taker - by Raj Aryan",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })
        return info;
    } catch (error) {
        console.log(error);
        console.log("ERROR SENDING OTP");
    }
}

module.exports = mailSender;

