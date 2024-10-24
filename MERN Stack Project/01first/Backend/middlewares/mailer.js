const mailer = require('nodemailer')

const transport = mailer.createTransport({
    service : "gmail",
    auth : {
        user : "kareliyaharshil2111@gmail.com",
        pass : "eedxxsxaznhqqlrn"
    }
})

module.exports.sendOtp = (to, otp)=>{
    const mailOptions = {
        from : "kareliyaharshil2111@gmail.com",
        to : to,
        subject : "Verification OTP",
        text : `Your verification OTP is ${otp}`
    }

    transport.sendMail(mailOptions, (err)=>{
        console.log(err? err : 'OTP Send Successfully');
    })
}