require('dotenv').config();
const bcrypt = require('bcrypt');

const express =  require('express');
const mongoose = require('mongoose');

const notificationRoute = require('./routes/notifications');
const authRoute = require('./routes/auth');
const app = express();
app.use(express.json());

mongoose
  .connect("mongodb+srv://phantom3:castiel1@cluster0.hvjd3.mongodb.net/greenhouseDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use('/api/notification',notificationRoute);
app.use('/api/auth',authRoute);
 
app.listen(8000,()=>{
    console.log("Server is active at port 8000");
})
