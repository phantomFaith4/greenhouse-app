const router = require('express').Router();
const axios = require('axios'); 

const key = 'a162899aba020d546d71f3f6256ebc72';

router.get('/:city', async(req,res)=>{
    const city = req.params.city;
    try{
        const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${key}`);
        res.status(200).json(weatherData.data);
    }catch(err){
        res.status(500).json(err); 
    }
});

module.exports = router;