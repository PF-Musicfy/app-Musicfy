const express = require('express');
const app = express();
//require('./db.js');

app.get('/', (req,res) => {
  res.send('Index')
})

app.listen(3000, () => {
  console.log('listen no nodemon')
})
