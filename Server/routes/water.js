const router = require('express').Router();
const Water = require('../models/Water');


router.get('/all', async(req,res)=>{
    try{
        const water = await Water.find();
        res.status(200).json(water);
    }catch(err){

    } 
});

router.get('/:location', async(req,res)=>{
    try{
        const location = req.params.location;
        const water = await Water.findOne({location:location});
        res.status(200).json(water);
    }catch(err){
        res.status(500).json(err); 
    }
});

router.post('/new', async(req,res)=>{
    try{
        const newWater = new Water({
            percentage: req.body.percentage,
            location: req.body.location,
            automatic: req.body.automatic,
            water: req.body.water,
            amount:req.body.amount,
            fertilizer:req.body.fertilizer,
            time: req.body.time,
            date: req.body.date,
        }); 
        const water  = newWater.save();
        res.status(200).json(water);
    }catch(err){
        res.status(500).json(err);
    }
});

router.put('/:location', async(req,res)=>{
    try{
        const filter = { location: req.params.location };
        const updateWater = {
            percentage: req.body.percentage,
            automatic: req.body.automatic, 
            water: req.body.water,
            amount:req.body.amount,
            fertilizer:req.body.fertilizer,
            time: req.body.time,
            date: req.body.date,  
        }
        try{  
            const water = await Water.findOneAndUpdate(filter,updateWater,{
                new: true,
            });
            res.status(200).json(water);
        }catch(err){
            res.status(404).json(err);
        }
    }catch(err){
        res.status(400).json(err);
    } 
});


module.exports = router;