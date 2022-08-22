const nodemailer = require('nodemailer')
function mailTransport() {
    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'JavierAvilaasdf@gmail.com',
          pass: 'yrrfmuxcfilbaxzl'
        }
    })    
}
module.exports = {mailTransport}