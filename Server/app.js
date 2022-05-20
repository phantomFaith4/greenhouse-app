require('dotenv').config();
const bcrypt = require('bcrypt'); 

const express =  require('express');
const mongoose = require('mongoose');

const notificationRoute = require('./routes/notifications');
const authRoute = require('./routes/auth');
const temperatureRoute = require('./routes/temperature');
const greenhouseRoute = require('./routes/greenhouse');
const userRoute = require('./routes/users');
const waterRoute = require('./routes/water');
const weatherRoute = require('./routes/weather');
const lightRoute = require('./routes/light');
const co2Route = require('./routes/co2');

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb+srv://phantom3:castiel1@cluster0.hvjd3.mongodb.net/greenhouseDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

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
