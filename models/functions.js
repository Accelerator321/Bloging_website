const nodemailer = require('nodemailer');
    
function sendMail(receiver, msg){
  
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
  user: 'Your_Email',
  pass: 'Ypur_key_generated_by_google'
}
});

var mailOptions = {
  from: 'shyamprime2610@gmail.com',
  to: receiver,
   subject: 'Authentication For Jblogs',
    text: `Your OTP for for Jblogs ${msg}`
};

transporter.sendMail(mailOptions); 
}
  
function generateOTP() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
  
module.exports = {sendMail,generateOTP};

