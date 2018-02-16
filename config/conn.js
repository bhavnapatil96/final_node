const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost/finaldb',(err,res)=>{
    console.log('Final DB Connected.....');
});