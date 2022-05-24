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
        const user = await User.findById(id); 
        res.status(200).json(user);
    }catch(err){
        res.status(404).json(err);
    }
});

router.put('/:id',async(req,res)=>{
    try{
        const userId = {_id : req.params.id};
        const update = { 
            name: req.body.name,
            lastname: req.body.lastname,
            email:req.body.email,
            phone:req.body.phone,
        };
        try{
            const doc = await User.findOneAndUpdate(userId, update, {
            new: true
            });
            res.status(200).json(doc);
        }catch(err){ 
            res.status(404).json(err);
        }   
    }catch(err){
        res.status(404).json(err);
    }
});


module.exports = router;