const router = require('express').Router();
const Light = require('../models/Light');

router.get('/all', async(req,res)=>{
    try{
        const data = await Light.find();
        res.status(200).json(data); 
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/:location', async(req,res)=>{
    try{
        const location = req.params.location;
        const data = await Light.findOne({location:location});
        res.status(200).json(data);
    }catch(err){
        res.status(500).json(err);
    }
});

router.post('/new', async(req,res)=>{
    try{
        const newLight = new Light({
            location: req.body.location,
            intensity: req.body.intensity,
            automatic: req.body.automatic,
            run: req.body.run,
            time: req.body.time,
            date: req.body.date,
        });
        const light = newLight.save();
        res.status(200).json(light);
    }catch(err){
        res.status(500).json(err);
    }
});

router.put('/:location',async(req,res)=>{
    try{
        const filter = {location: req.params.location};
        const updateLight = {
            intensity:req.body.intensity,
            automatic:req.body.automatic,
            run:req.body.run,
            time:req.body.time,
            date:req.body.date,
        }
        try{
            const light = await Light.findOneAndUpdate(filter,updateLight, {
                new:true,
            });
            res.status(200).json(light);
        }catch(err){
            res.status(404).json(err);
        }
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;