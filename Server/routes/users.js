const router = require('express').Router();


router.get('/',async(req,res)=>{
    res.send("This is user")
});


module.exports = router;