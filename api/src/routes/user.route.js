const {Router} = require('express');
const axios = require('axios');
const User = require("../models/User.js");

const router = Router();

router.get('/',async (req,res)=>{
  const users = await User.find();
  res.send(users);
})
router.get('/free',async (req,res)=>{
  try{
    console.log('free');
    //const users = await User.find({$or:[ {'premium':"false"}, {'premium':false} ]});
    const users = await User.find({ premium: false });
    res.send(users);
  }catch (e){
    res.status(500).send('error');
  }
})
router.get('/premium',async (req,res)=>{
  const users = await User.find({ premium: true });
  res.send(users);
})
router.get('/admin',async (req,res)=>{
  const users = await User.find({ admin: true });
  res.send(users);
})
router.post('/online',async (req,res) => {
  try{
    const { id } = req.body;
    let user = await User.findById(id);
    user.online = !user.online;
    await user.save()
    console.log(`user: ${id} | ${user.online}`);
    res.send(user.online);
  }catch(e){
    res.status(500).send('error post/online');
  }
})
router.get('/online/:id',async (req,res) => {
  try{
    const { id } = req.params;
    let user = await User.findById(id);
    res.send(user.online);
  }catch(e){
    res.status(500).send('error get/online');
  }
})
module.exports = router;
