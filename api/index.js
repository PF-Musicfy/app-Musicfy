const express = require('express');
const nodemailer = require('nodemailer')
const app = express();
const {generateToken} = require('./src/controllers/generateTokenController')
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
  let token = generateToken()
  let mailOptions = {
    from: "adminAPI",
    to: "santiagojavierlevy@gmail.com",
    subject: "Register succesful",
    text: `Hello! Put this token in the token input in order to register: ${token}. Then, click on "Register" button.`
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
