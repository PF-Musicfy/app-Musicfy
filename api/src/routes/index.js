const nodemailer = require('nodemailer')
const { Router } = require('express')
const app = Router();
const {generateToken} = require('../controllers/generateTokenController')
const { getByName, getTrackId, topMusic, getAlbumId, getArtistId, getPlaylistId } = require("../controllers/index")
const authRouter = require("./auth.route.js");
app.use("/api/v1/auth", authRouter);

app.get("/topmusic", async (req, res, next)=> {
  let music = await topMusic()
  try {
    res.status(200).send(music)
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
  const {eMail} = req.body
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
    to: eMail,
    subject: "Register succesful",
    text: `Hello! Put this key into KEY input in order to complete registration: ${token}.`
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message)
    } else {
      console.log('email enviado')
      res.status(200).jsonp(token)
    }
  })
})

  app.get("/track/:id", async (req, res, next) => {
    try{
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
    }catch(e){
      console.log('break', e)
    }
  })

  app.get("/album/:id", async (req, res, next) => {
    try{
      const { id } = req.params;
  
      const idAlbum = await getAlbumId(id)
  
      if(id){
        try {
          res.status(200).send(idAlbum)
        } catch (error) {
          next(error)
        }
      }
      else{
        res.status(400).send("not have id")
      }
    }catch(e){
      console.log('break', e)
    }
  })

  app.get("/artist/:id", async (req, res, next) => {
    try{
      const { id } = req.params;
  
      const idAlbum = await getArtistId(id)
  
      if(id){
        try {
          res.status(200).send(idAlbum)
        } catch (error) {
          next(error)
        }
      }
      else{
        res.status(400).send("not have id")
      }
    }catch(e){
      console.log('break', e)
    }
  })

  app.get("/playlist/:id", async (req, res, next) => {
    try{
      const { id } = req.params;
  
      const idPlaylist = await getPlaylistId(id)
  
      if(id){
        try {
          res.status(200).send(idPlaylist)
        } catch (error) {
          next(error)
        }
      }
      else{
        res.status(400).send("not have id")
      }
    }catch(e){
      console.log('break', e)
    }
  })


  module.exports = app