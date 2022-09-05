const { findById } = require("../models/Post.js");
const User = require("../models/User.js");
const { generateRefreshToken, generateToken } = require("../utils/tokenManager.js");

// Kosovomba
const bcrypt = require("bcryptjs");
const { mailTransport } = require("../controllers/mailController");
const validate = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(404).send(`${email} already exists`);
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    let validationLink = `http://localhost:3000/validate/${email}/${username}/${hashPassword}`;
    console.log(validationLink);
    let transporter = mailTransport();
    let mailOptions = {
      from: "adminAPI",
      to: email,
      subject: "Validation link",
      html: `<b> Hello! Click this link in order to complete registration: </b>
    <a href= "${validationLink}">Link</a>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        console.log("email enviado");
        return res.status(200).send();
      }
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Kosovomba

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    let user = await User.findOne({ email });

    // if (user) alert("Email already exists");
    if (user) {
      return res.status(404).send(`${email} already exists`);
    }
    console.log(user)

    user = new User({ username, email, password });
    await user.save();

    // genrerar jwt
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.status(201).json({ token, expiresIn });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) throw new Error("This user does not exist");

    const responsePassword = await user.comparePassword(password);
    if (!responsePassword) throw new Error("Incorrect password");

    // generar jwt
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    user.online = true;
    await user.save();

    return res.json({ token, expiresIn });
  } catch (error) {
    return res.status(403).json({ error: error.message });
  }
};

const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid, {
      password: 0,
      _id: 0
    });
    if (user === null) throw new Error("aqui devuelve null y rompe el front");
    res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "server error" });
  }
};

const refreshTokenUser = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);

    return res.json({ token, expiresIn });
  } catch (error) {
    return res.status(500).json({ error: "server error" });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};

const premiumUser = async (req, res) => {
  const { premium } = req.body;
  const user = await User.findByIdAndUpdate(req.uid, {
    premium
  });
  await user.save();
  console.log("El usuario se hizo premium");
  return res.json({ message: "Usuario pasado a premium" });
};

const avatarUser = async (req, res) => {
  const { avatar } = req.body;
  const user = await User.findByIdAndUpdate(req.uid, {
    avatar
  });
  await user.save();
  console.log(avatar)
  return res.json({ message: "Avatar cambiado" });
};

const setmp3User = async (req, res) => {
  const { avatar } = req.body;
  const user = await User.findByIdAndUpdate(req.uid, {
    avatar
  });
  await user.save();
  return res.json({ message: "Avatar cambiado"});
};

const favoritesUser = async (req, res ) => {
  const { favorites } = req.body;
    try {
      const user = await User.findById(req.uid)
    
      const favoriteFound = user.favorites.filter(e => e.id === favorites.id)
      if (favoriteFound.length) {
        res.json({message: 'Esta cancion ya se encuentra en favoritos'})
      }else{
        const userUpdate = await User.findByIdAndUpdate(req.uid, {$push: {favorites}})
        res.json({message: 'Se guardo la cancion en favoritos'})
      }
    }catch (error) {
      console.log(error)
    }
  }
  //   const user = await User.findById(req.uid, { password: 0})
  //       const filterUser = user.favorites.map(e => e.id)
  //       if(!filterUser.length){
  //         console.log("hola")
  //       const userUpdate = await User.findByIdAndUpdate(req.uid, {$push: {favorites}})
  //       console.log(userUpdate)
  //        return res.json({message: "no hay nada en favoritos y se guardo"})
  //       }else if(filterUser && !filterUser.includes(favorites.id)){
  //         console.log("chao")
  //         const userUpdateFilter = await User.findByIdAndUpdate(req.uid, {$push: {favorites}})
  //           return res.json({message: "aqui hay algo en favoritos y no es duplicado"})
  // } else{
  //   return res.json({message: "hay duplicado y no se guardo"})
  // }


const favoritesDelete = async (req, res) => {
  const { remove } = req.body;
  const user = await User.findByIdAndUpdate(req.uid, {$pull: {favorites: {'id': remove}}});

  await user.save();
  return res.json({message: "musica eliminada"})
}


module.exports = {
  validate,
  registerUser,
  loginUser,
  infoUser,
  refreshTokenUser,
  logoutUser,
  premiumUser,
  avatarUser,
  setmp3User,
  favoritesUser,
  favoritesDelete,
};
