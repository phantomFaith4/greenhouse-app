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

router.get('/:location', async(req,res)=>{
    const location = req.params.location;
    try{
        const greenhouse = await Greenhouse.findOne({name:location});
        res.status(200).json(greenhouse);
    }catch(err){
        res.status(400).json(err);
    }
});

router.post('/new', async(req,res)=>{
    const nameOfGreenhouse = req.body.name;
    const locationOfGreenhouse = req.body.location;
    const contentOfGreenhouse = req.body.content;
    const descriptionOfGreenhouse = req.body.description;
    const sizeOfGreenhouse = req.body.size;
    try{
        const newGreenhouse = new Greenhouse({
            name : nameOfGreenhouse,
            location: locationOfGreenhouse,
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
    const id = req.params.id;
    try{
        await Greenhouse.findByIdAndDelete(id);
        res.status(200).json("Greenhouse has been deleted");
    }catch(err){
        res.status(400).json(err);
    }
});

module.exports = router;