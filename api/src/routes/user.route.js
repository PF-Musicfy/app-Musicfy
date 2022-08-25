const {Router} = require('express');
const axios = require('axios');
const User = require("../models/User.js");

const router = Router();

router.get('/',async (req,res)=>{
  const users = await User.find();
  console.log(users);
  res.send(users);
})
router.get('/free',async (req,res)=>{
  try{
    console.log('free');
    //const users = await User.find({$or:[ {'premium':"false"}, {'premium':false} ]});
    const users = await User.find({ premium: false });
    console.log(users);
    res.send(users);
  }catch (e){
    res.status(500).send('error');
  }
})
router.get('/premium',async (req,res)=>{
  const users = await User.find({ premium: true });
  console.log(users);
  res.send(users);
})
router.get('/admin',async (req,res)=>{
  const users = await User.find({ admin: true });
  console.log(users);
  res.send(users);
})
router.post('/online',async (req,res) => {
  try{
    const { id } = req.body;

    let user = await User.findById(id);
    user.online = !user.online;
    await user.save()
    console.log(`user: ${id} | ${user.online}`);
    res.send(user);
  }catch(e){
    res.status(500).send('error /online');
  }
})
module.exports = router;   
