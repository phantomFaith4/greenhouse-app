const router = require('express').Router();
const User = require('../models/User');

router.get('/all',async(req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(404).json(err);
    }
});

router.get('/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(404).json(err);
    }
});

router.put('/:id',async(req,res)=>{
    try{

    }catch(err){
        res.status(404).json(err);
    }
});


module.exports = router;