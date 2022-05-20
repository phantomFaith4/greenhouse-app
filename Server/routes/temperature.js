const router = require('express').Router();
const Temperature = require('../models/Temperature');

router.post('/new',async(req,res)=>{
    try{   
        const newTemp = new Temperature({
            temperature: req.body.temperature,
            location: req.body.location, 
            automatic: req.body.automatic,
        });  
        const temp = await newTemp.save();
        res.status(200).json(temp);
    }catch(err){
        res.status(400).json(err);
    }
});
router.put('/:location', async(req,res)=>{
    try{
        const filter = { location: req.params.location };
        const update = { 
            temperature: req.body.temperature,
            automatic: req.body.automatic,
        };
        try{
            const doc = await Temperature.findOneAndUpdate(filter, update, {
            new: true
            });
            res.status(200).json(doc);
        }catch(err){
            res.status(404).json(err);
        }   
    }catch(err){ 
        res.status(400).json(err);
    }
});
 
router.get('/:location',async(req,res)=>{
    const location = req.params.location;
    try{
        try{
            const doc = await Temperature.findOne({location : location});
            res.status(200).json(doc);
        }catch(err){
            res.status(404).json(err);
        }
    }catch(err){
        res.status(400).json(err);
    }
});

router.get('/all', async(req, res)=>{
    try{
        const doc = await Temperature.find();
        res.status(200).json(doc);
    }catch(err){
        res.status(400).json(err);
    }
});


module.exports = router;