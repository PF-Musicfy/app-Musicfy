const { Router } = require("express");
const axios = require("axios");
const User = require("../models/User.js");
const { generateRefreshToken, generateToken } = require("../utils/tokenManager.js");

const router = Router();

router.get("/", async (req, res) => {
  const { username } = req.query;
  console.log(req.query);
  if (username) {
    let userFound = await User.find({
      username: { $regex: username, $options: "i" }
    }).limit(5);
    return res.send(userFound);
  } else {
    const users = await User.find();
    res.send(users);
  }
});
router.get("/free", async (req, res) => {
  try {
    console.log("free");
    //const users = await User.find({$or:[ {'premium':"false"}, {'premium':false} ]});
    const users = await User.find({ premium: false });
    res.json(users);
  } catch (e) {
    res.status(500).send("error");
  }
});
router.get("/premium", async (req, res) => {
  const users = await User.find({ premium: true });
  res.send(users);
});

router.get("/admin", async (req, res) => {
  const users = await User.find({ admin: true });
  res.send(users);
});

router.post("/online", async (req, res) => {
  try {
    const { id } = req.body;
    let user = await User.findById(id);
    user.online = !user.online;
    await user.save();
    console.log(`user: ${id} | ${user.online}`);
    res.send(user.online);
  } catch (e) {
    res.status(500).send("error post/online");
  }
});
router.get("/online/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findById(id);
    res.send(user.online);
  } catch (e) {
    res.status(500).send("error get/online");
  }
});

router.post("/changeadmin", async (req, res) => {
  try {
    const { id } = req.body;
    let user = await User.findById(id);
    user.admin = !user.admin;
    await user.save();
    res.send();
  } catch (error) {
    res.status(500).send("error put/admin");
  }
});
router.post("/changeblock", async (req, res) => {
  try {
    const { id } = req.body;
    let user = await User.findById(id);
    user.isblocked = !user.isblocked;
    await user.save();
    res.send();
  } catch (error) {
    res.status(500).send("error put/block");
  }
});
router.post("/google", async (req,res) => {
  try {
    const { username, email } = req.body;
    console.log(req.body);
    let user = await User.findOne({ email });

    if (user) {
      const { token, expiresIn } = generateToken(user.id);
      generateRefreshToken(user.id, res);
      console.log('google',user);
      return res.status(201).json({ token, expiresIn });
    }

    user = new User({ username, email });
    user.google = true;
    await user.save();

    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    console.log('google',user);
    return res.status(201).json({ token, expiresIn });
  } catch (error) {
    console.log('error post/google',error)
  }
})
module.exports = router;
