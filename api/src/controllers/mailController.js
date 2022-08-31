const nodemailer = require('nodemailer')
function mailTransport() {
    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS
        }
    })    
}
module.exports = {mailTransport}