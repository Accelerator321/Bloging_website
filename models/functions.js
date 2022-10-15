const nodemailer = require('nodemailer');
    
function sendMail(receiver, msg){
  
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
  user: 'shyamprime2610@gmail.com',
  pass: 'fzwtgztfyrxjjole'
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

