require("dotenv").config()

const nodemailer = require('nodemailer')
function mailTransport() {
    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.USERMAIL,
          pass: process.env.PASSMAIL
        }
    })    
}
module.exports = {mailTransport}