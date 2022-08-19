const nodemailer = require('nodemailer')
const { Router } = require('express')
const app = Router();
const { topAlbums, topTracks, topArtists, topPlaylists, getByName, getTrackId } = require("../controllers/index")


app.get("/topalbums", async (req, res, next)=> {
  let album = await topAlbums()

  try {
    res.status(200).send(album)
  } catch (error) {
    next(error)
  }
})

app.get("/toptracks", async (req, res, next)=> {
  let tracks = await topTracks()

  try {
    res.status(200).send(tracks)
  } catch (error) {
    next(error)
  }
})

app.get("/topartists", async (req, res, next)=> {
  let artists = await topArtists()

  try {
    res.status(200).send(artists)
  } catch (error) {
    next(error)
  }
})

app.get("/topplaylists", async (req, res, next)=> {
  let playlists = await topPlaylists()

  try {
    res.status(200).send(playlists)
  } catch (error) {
    next(error)
  }
})

app.get("/topstations", async (req, res, next)=> {
  let stations = await topStations()

  try {
    res.status(200).send(stations)
  } catch (error) {
    next(error)
  }
})

app.get("/", async (req, res, next)=> {
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
    res.status(400).send("no se encuentra")
  } catch (error) {
    next
  }
}
})


app.post("/send-email", (req, res, next) => {
    // const {eMail} = req.body
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'anibal.hickle52@ethereal.email',
        pass: 'szSFDjr4pppzECtx1E'
      }
    })
    let mailOptions = {
      from: "Remitente",
      to: "JavierAvilaAsdf@gmail.com",
      subject: "Register succesful",
      text: "Hello! You've registered succesfuly in Musicfy. Your password is asdf. You can change it in your profile options, when logged in."
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
        res.status(400).send("no tiene id")
      }
  
  })

  module.exports = app