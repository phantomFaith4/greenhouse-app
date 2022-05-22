const router = require('express').Router();
const CO2 = require('../models/CO2');

router.get('/all', async(req,res)=>{
    try{
        const data = await CO2.find();
        res.status(200).json(data); 
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/:location', async(req,res)=>{
    try{
        const location = req.params.location;
        const data = await CO2.findOne({location:location});
        res.status(200).json(data);
    }catch(err){
        res.status(500).json(err);
    }
});

router.post('/new', async(req,res)=>{
    try{
        const newCO2 = new CO2({
            fan1:req.body.fan2,
            fan2:req.body.fan2,
            location:req.body.location,
            speed:req.body.speed,
            run:req.body.run,
            time:req.body.time,
            date:req.body.date,
        }); 
        co2 = newCO2.save();
        res.status(200).json(co2);
    }catch(err){
        res.status(500).json(err);
    }
});

router.put('/:location', async(req,res)=>{
    try{
        const filter = {location: req.params.location};
        const updateCO2 = {
            fan1: req.body.fan1,
            fan2: req.body.fan2,
            speed: req.body.speed,
            run: req.body.run,
            time:req.body.time,
            date:req.body.date,
        }
        try{
            const co2 = await CO2.findOneAndUpdate(filter,updateCO2,{
                new:true,
            });
            res.status(200).json(co2); 
        }catch(err){
            res.status(404).json(err);
        }
    }catch(err){
        res.status(200).json(err);
    }
});


module.exports = router;