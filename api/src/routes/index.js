const nodemailer = require('nodemailer')
const Post = require("../models/Post.js");
const {mailTransport} = require('../controllers/mailController')
const { Router } = require('express')
const app = Router();
const {generateToken} = require('../controllers/generateTokenController')
const { getByName, getTrackId, topMusic, getAlbumId, getArtistId, getPlaylistId, combinedFilters } = require("../controllers/index")
const authRouter = require("./auth.route.js");
const userRouter = require("./user.route.js");
const PaymentController = require("../controllers/PaymentController");
const PaymentService = require("../controllers/PaymentService");
const PaymentInstance = new PaymentController(new PaymentService());


app.use("/api/v1/auth", authRouter);
app.use("/user", userRouter);


app.get("/genres/:genre/:tops", async (req, res, next)=> {
  let {genre} = req.params
  let {tops} = req.params
  console.log(genre)
  console.log(tops)
  let music = await combinedFilters(genre, tops)
  console.log(music)
  try {
    res.status(200).send(music)
  } catch (error) {
    next(error)
  }
})


app.get("/payment", async function (req, res, next) {
  PaymentInstance.getPaymentLink(req, res);
});

app.get("/subscription", async function (req, res, next) {
  const { email } = req.body
  if(email){
    try{
      PaymentInstance.getSubscriptionLink(req, res, email);
    }catch(error){
      next(error)
    }
  }else{
    res.status(400).send({msg: "need a email"})
  }
});


app.get("/topmusic", async (req, res, next)=> {
  try {
    let music = await topMusic()
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

// app.post("/send-email", (req, res, next) => {
//   const {eMail} = req.body
//   let token = generateToken()
//   let transporter = mailTransport()
//   let mailOptions = {
//     from: "adminAPI",
//     to: eMail,
//     subject: "Key obtained",
//     text: `Hello! Put this key into KEY input in order to complete registration: ${token}.`
//   }
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       res.status(500).send(error.message)
//     } else {
//       console.log('email enviado')
//       res.status(200).jsonp(token)
//     }
//   })
// })

app.post("/send-email-registered", (req, res, next) => {
  const {eMail} = req.body  
  let transporter = mailTransport()
  let mailOptions = {
    from: "adminAPI",
    to: eMail,
    subject: "Register succesful",
    text: `You have been succesfully registered in Musicfy! Welcome!`
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

app.post("/feedback", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newPost = new Post({title, description});
    await newPost.save()
    console.log(newPost)
    res.send('newPost saved');
  }catch(e){
    res.status(500).send('newPost failed');
  }
})

app.get("/feedback", async (req, res) => {
  try{
    const posts = await Post.find();
    console.log(posts);
    res.send(posts);
  }catch(e){
    res.status(500).send('not get Post');
  }
})

  module.exports = app
