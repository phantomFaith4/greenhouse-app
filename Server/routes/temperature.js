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
router.put('/:id',async(req,res)=>{

});

router.get('/',async(req,res)=>{

});
module.exports = router;