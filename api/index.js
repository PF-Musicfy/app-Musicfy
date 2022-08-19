const express = require('express');
const nodemailer = require('nodemailer')
const app = express();
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
  let mailOptions = {
    from: "adminAPI",
    to: "santiagojavierlevy@gmail.com",
    subject: "Register succesful",
    text: `Hello! You've registered succesfuly in Musicfy. Your password is asdf. You can change it in your profile options, when logged in.`
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
  console.log('listen no nodemon')
})
