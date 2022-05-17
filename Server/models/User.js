const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        name:{
            type:String,
            required:false,
            default:'',
        },
        phone:{
            type:String,
            required:false,
            default:'',
        },
        lastname:{
            type:String,
            required:false,
            default:'',
        },
        password:{
            type:String,
            required:true,
        },
        profilePicture:{
            type:String,
            default:'',
        },
    },
    {timestamps:true}
)
module.exports = mongoose.model('User',UserSchema);