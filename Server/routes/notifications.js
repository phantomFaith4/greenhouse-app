const router = require('express').Router();
const Notification = require('../models/Notification');

router.get('/all',async(req,res)=>{
   try{
    let notifications = await Notification.find();
    res.status(200).json(notifications);
   }catch(err){
       res.status(400).json(err);
   }
}) 
router.post('/new',async(req,res)=>{
    try{
        const newNotification = new Notification({
            value : req.body.value,
            location : req.body.location,
        });
        const notification = await newNotification.save();
        res.status(200).json(notification);
    }catch(err){
        res.status(400).json(err);
    };
});
module.exports = router;