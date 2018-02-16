const mongoose=require('mongoose');
const validator=require('validator');

var StateSchema=new mongoose.Schema({
    statename:{
        type:String
    }
});
let state=mongoose.model('state',StateSchema);
module.exports={state};