const router = require('express').Router();

router.get('/',async (req,res)=>{
    res.send("THIS IS NOTIFICATION ROUTE");
})

module.exports = router;