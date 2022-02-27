const router = require('express').Router();
const Temperature = require('../models/Temperature');


router.get('/',async(req,res)=>{
    res.status(200).json("temperature GET");
});

router.post('/',async(req,res)=>{

});
module.exports = router;