const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cors = require('cors')
const url = `mongodb+srv://harshitnagar:harshit@learning.g2337c4.mongodb.net/JWT_AUTH?retryWrites=true&w=majority`;
mongoose.connect(url,{
    useNewUrlParser: true
  }).then(()=>{
    console.log('connected')
  }).catch((error)=>{
    console.log(error,'error')
  })
const app  = express();
const port = 4000;
app.use(express.json());
app.use(cors())
app.use(authRoutes)
app.get('/' , (req , res) =>{
    res.send('hey i am home')
})
app.listen(port,()=>{
    console.log('server stared')
})
