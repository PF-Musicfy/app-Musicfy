# MUSICFY APP
## Final Project - Musicfy APP music streaming

![Musicfy](https://res.cloudinary.com/dyj81r2fi/image/upload/c_scale,w_700/v1663264947/Captura_desde_2022-09-15_15-00-20_u3rrff.png)


This is an academic project done as a final project of Henry's fullstack bootcamp. It is a music streaming web application that allows the user to listen on demand. It has authentication and a functional payment gateway implemented.

You can access the site at the following link: [MusicFy](https://app-musicfy.vercel.app/)

## Authors
- [Alejandro Maturrano](https://www.linkedin.com/in/tm10ymhp/)
- [Jose Casanova](https://www.linkedin.com/in/jacasanova98/)
- [Santiago Levy](https://www.linkedin.com/in/santiago-levy-dev/)
- [Gabriel Sanchez](https://www.linkedin.com/in/gabriel-sanchez-0591a723a/)
- [Hugo Avila](https://www.linkedin.com/in/devhugoavila/)
- [Elam Cano](https://www.linkedin.com/in/elam-cano-bb0419239/)
- [Eduardo Sequeira](https://www.linkedin.com/in/eduardo-sequeira-4502bb244/)

## Tech Stack
**Client**: ReactJS, Redux Toolkit, TailWind, Sweetalert2, Pure CSS

**Server**: NodeJS, Express, Mongoose, MongoDB

---

## Features
- Authentication (user, moderator and administrator).
- Login and Registration with Google.
- Payment gateway with Mercado Pago.
- Stream random music as a free user.
- Stream unlimited music as a premium user.
- Upload music, change avatar, add music to favorites and create custom list.
- 100% responsive styles.
- Admin panel to block users, sending messages, admin or moderator privilege.
- Link to validate the registration by mail.

---

**Environment Variables**

To run this project, you will need to add the following environment variables to your .env file

**API**

`URI_MONGO=`

`JWT_SECRET=`

`JWT_REFRESH=`

`MODO=`

`ACCESS_TOKEN=`

`ORIGIN1=`

`USERMAIL=`

`PASSMAIL=`


## Run Locally

Clone the project

```bash
git clone https://github.com/PF-Musicfy/app-Musicfy.git
```

Go to the project directory

```bash
cd app-Musicfy
```

Install dependencies in both folders (API and CLIENT)

```bash
cd api/
   npm install
cd ..
cd client/
   npm install
```

Start the server

Front
```bash
cd client/
   npm start
```
Back
```bash
cd api/
   npm start
```