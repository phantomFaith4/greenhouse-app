require('dotenv').config();
const bcrypt = require('bcrypt'); 
const express =  require('express');
const mongoose = require('mongoose');

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const notificationRoute = require('./routes/notifications');
const authRoute = require('./routes/auth');
const temperatureRoute = require('./routes/temperature');
const greenhouseRoute = require('./routes/greenhouse');
const userRoute = require('./routes/users');
const waterRoute = require('./routes/water');
const weatherRoute = require('./routes/weather');
const lightRoute = require('./routes/light');
const co2Route = require('./routes/co2');
const User = require('./models/User');



const app = express();
app.use(express.json());

mongoose
  .connect("mongodb+srv://phantom3:castiel1@cluster0.hvjd3.mongodb.net/greenhouseDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

  //******************************************************************** */



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
    },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
  
app.post("/api/uploadPhoto/:id",upload.single("file"), async (req, res) => {
  const userId = req.params.id;
  const obj = {
      img: {
          data: fs.readFileSync(path.join(__dirname + "/uploads/" + req.file.filename)),
           contentType: "image/png"
      }
    }
    const updateImg = await User.findByIdAndUpdate(userId,{
      image:obj.img,
    })
    res.status(200).json("image uploaded")
});


  //******************************************************************** */



app.use('/api/notification', notificationRoute); 
app.use('/api/auth', authRoute); 
app.use('/api/temperature', temperatureRoute);
app.use('/api/greenhouse', greenhouseRoute);
app.use('/api/user/', userRoute);
app.use('/api/water/', waterRoute);
app.use('/api/weather/', weatherRoute);
app.use('/api/light/', lightRoute);
app.use('/api/co2/', co2Route);



app.listen(8000,()=>{
    console.log("Server is active at port 8000"); 
})
