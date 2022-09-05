require("dotenv").config()
const express = require('express')

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

function mailSendMessage(email, subject, text) {
  return {
  from: "adminAPI",
  to: email,
  subject: subject,
  text: text
  }
}

function mailRegistered(email) {
  console.log('URL:', express.defaultURL)
  return {
  from: "adminAPI",
  to: email,
  subject: "Register succesful",
  // text: ``,
  html: `
  <div style="background-color: black; color: white;">
        <div style="padding: 20px">
            <img src="https://i.imgur.com/GiyjGcI.png" alt="Musicfy Logo"/>
            <span style="font-size: 32px; align-self: center;"> You have been succesfully registered in Musicfy! Welcome! </span>            
        </div>
        <div style="background-image: url('https://res.cloudinary.com/hugok2k/image/upload/v1661141186/publico_szlkhk.jpg'); padding: 20px; background-size:cover; background-repeat: no-repeat;">
          <div> <h3> As a free user, you can search and listen the best music. You can also see the top tracks, albums, artists and playlists, weekly! </h3> </div>
          <div> <h3> To avoid ads, you can be a premium member!. </h3> 
                    <h3> As a premium member, you can add favorites, custom your own playlists, receive recommendations and more! </h3>
                    <a href="${express.defaultURL}/premium" style="color: white; font-size: 28px; font-weight: 500;"> Click here to see the full benefits and go premium now!!! </a>
          </div>
        </div>
  </div>
  `
  }
};
module.exports = {mailTransport, mailRegistered, mailSendMessage}