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
            fan:req.body.fan,
            location:req.body.location,
            speed:req.body.speed,
            run:req.body.run,
        }); 
        co2 = newCO2.save();
        res.status(200).json(co2);
    }catch(err){
        res.status(500).json(err);
    }
});

router.put('/:location',async(req,res)=>{

});


module.exports = router;