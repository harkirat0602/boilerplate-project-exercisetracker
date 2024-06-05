const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser =require("cookie-parser");
require('dotenv').config()
const mongoose= require('mongoose')
const { User } = require('./models.js')
const conn = mongoose.connect(process.env.DB_URL)

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true, limit:"32kb"}))
app.use(express.urlencoded())
app.use(cookieParser())
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


app.post('/api/users',async (req,res)=>{

  console.log(req.body.username);
  const user = await User.create({
    username: req.body.username
  })

  const createdUser = await User.findById(user._id)

  if(!createdUser){
    return res.status(500).json( {error:"User not Created"} )
  }

  return res
  .status(200)
  .json({
    username: createdUser.username,
    _id: createdUser._id
  })

})

app.get('/api/users',async (req,res)=>{
  const data = await User.find().select('username _id')

  if(!data){
    return res.status(200).json([])
  }

  return res
  .status(200)
  .json(data)
})





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
