const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
var StudentSchema=new mongoose.Schema({
    name:{
        type:String
    },
    age:{
        type:Number
    },
    contact:{
        type:Number
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    gender:{
        type:String
    },
    hobby:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    photo:{
        type:String
    },
    flag:{
        type:Boolean,
        default:true
    }

});

StudentSchema.pre('save',function (next) {

    let student=this;
    if(student.isModified('password')){
        bcrypt.genSalt((10,(err,salt)=>{
            bcrypt.hash(student.password,salt,(err,hash)=>{
                student.password=hash;
                next();
            })
        }))
    }
    else{
        next();
    }
});
let student=mongoose.model('student',StudentSchema);
module.exports={student}