const router = require('express').Router();
const Greenhouse = require('../models/Greenhouse');


router.get('/all', async(req,res)=>{
    try{
        const greenhouse = await Greenhouse.find();
        res.status(200).json(greenhouse);
    }catch(err){
        res.status(400).json(err);
    }
});

router.put('/', async(req,res)=>{

});

router.post('/new', async(req,res)=>{
    const nameOfGreenhouse = req.body.name;
    const contentOfGreenhouse = req.body.content;
    const descriptionOfGreenhouse = req.body.description;
    const sizeOfGreenhouse = req.body.size;
    try{
        const newGreenhouse = new Greenhouse({
            name : nameOfGreenhouse,
            content : contentOfGreenhouse,
            description : descriptionOfGreenhouse,
            size : sizeOfGreenhouse,
        });
        const greenhouse = newGreenhouse.save();
        res.status(200).json(greenhouse);
    }catch(err){
        res.status(400).json(err);
    }
});

router.delete('/:id',async(req,res)=>{

});

module.exports = router;