const express = require('express');
const nodemailer = require('nodemailer')
const app = express();
const {generatePassword} = require('./src/controllers/generatePasswordController')
//require('./db.js');

app.get('/', (req,res) => {
  res.send('Index')
})

app.post("/send-email", (req, res, next) => {
  // const {eMail} = req.body
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'JavierAvilaasdf@gmail.com',
      pass: 'yrrfmuxcfilbaxzl'
    }
  })
  let password = generatePassword()
  let mailOptions = {
    from: "adminAPI",
    to: "santiagojavierlevy@gmail.com",
    subject: "Register succesful",
    text: `Hello! You've succesfuly registered in Musicfy. Your password is ${password}. You can change it in your profile options, when logged in.`
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message)
    } else {
      console.log('email enviado')
      res.status(200).jsonp(req.body)
    }
  })
})

app.listen(3001, () => {
  console.log('%s listening in port 3001')
})
