const nodemailer = require('nodemailer')
const { Router } = require('express')
const app = Router();
const { getByName, getTrackId, topMusic } = require("../controllers/index")
const {generatePassword} = require('../controllers/generatePasswordController')

app.get("/topmusic", async (req, res, next)=> {
  let album = await topMusic()

  try {
    res.status(200).send(album)
  } catch (error) {
    next(error)
  }
})

app.get("/name", async (req, res, next)=> {
  const { name } = req.query

  let getName = await getByName(name)
  
  if(name){
  try {
    res.status(200).send(getName)
  } catch (error) {
    next(error)
  }
}else{
  try {
    res.status(400).send("not found")
  } catch (error) {
    next
  }
}
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

  app.get("/:id", async (req, res, next) => {
      const { id } = req.params;
  
      const idTrack = await getTrackId(id)
  
      if(id){
        try {
          res.status(200).send(idTrack)
        } catch (error) {
          next(error)
        }
      }
      else{
        res.status(400).send("not have id")
      }
  
  })

  module.exports = app