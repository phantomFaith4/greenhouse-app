const router = require('express').Router();

router.get('/:id',async (req,res)=>{
    res.send("THIS IS NOTIFICATION ROUTE");
})

router.get('/',async(req,res)=>{
    res.status(200).json("all notification");
})

router.post('/',async(req,res)=>{
    res.status(200).json('new notification');
});
module.exports = router;