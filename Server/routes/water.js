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
    const location = req.params.location;
    try{
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
        });
        const water  = newWater.save();
        res.status(200).json(water);
    }catch(err){
        res.status(500).json(err);
    }
});

router.put('/:location', async(req,res)=>{
    try{
        const location = req.params.location;
        const updateWater = {
            percentage: req.body.percentage,
            location: req.body.location,
            automatic: req.body.automatic,
            water: req.body.water,
            amount:req.body.amount,
            fertilizer:req.body.fertilizer,
        }
        try{
            const water = await Water.findOneAndUpdate(location,updateWater,{
                new: true,
            });
            res.status(200).json(water);
        }catch(err){
            res.status(403).json(err);
        }
    }catch(err){
        res.status(500).json(err);
    } 
});


module.exports = router;