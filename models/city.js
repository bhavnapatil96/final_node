const mongoose=require('mongoose');
const validator=require('validator');
var CitySchema=new mongoose.Schema({
    cityname:{
        type:String
    },
    stateid:{
        type:String
    }
});

let city=mongoose.model('city',CitySchema);
module.exports={city}