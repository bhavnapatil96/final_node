const express=require('express');
const bodyParser=require('body-parser');
const _=require('lodash');


var conn=require('./config/conn');
var student=require('./models/student').student;
var state=require('./models/state').state;
var city=require('./models/city').city;

var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin X-Requested-With Content-Type Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(`Access-Control-Allow-Methods`, `POST`);
    res.header(`Access-Control-Expose-Headers`, `x-auth`);
    next();
})

app.get('/list',(req,res)=>{

    student.find({flag:true}).then((data)=>{
        console.log(data)
        res.send(data);
    }).catch((e)=>{
        console.log("Error ",e);
        res.send(e);
    })
});
app.post('/add',(req,res)=>{
    var newStudent=new student({
        name:req.body.name,
        age:req.body.age,
        contact:req.body.contact,
        email:req.body.email,
        gender:req.body.gender,
        hobby:req.body.hobby,
        city:req.body.city,
        password:req.body.password,
        state:req.body.state,
        photo:req.body.photo

    })
    newStudent.save().then((data)=>{
        res.send(data);
    }).catch((e)=>{
        console.log("Error : ",e);
        res.send(e);
    })

});
app.post('/delete',(req,res)=>{
    student.findByIdAndUpdate(req.body.id,{$set:{flag:false}}).then((data)=>{
        res.send(data)
    }).catch((e)=>{
        console.log("Error : ",e);
        res.send(e);
    })
});
app.post('/update',(req,res)=>{
    var id=req.body.id;
    var body=_.pick(req.body,['name','age','contact','email','gender','hobby','city','state','photo'])
    student.findByIdAndUpdate(id,{$set:body}).then((data)=>{
        res.send(data);
    }).catch((e)=>{
        console.log("Error ",e);
        res.send(e);
    })
});
app.post('/addstate',(req,res)=>{
    newState=new state({
        statename:req.body.statename
    });

    newState.save().then((data)=>{
        res.send(data);
    }).catch((e)=>{
        console.log("Error : ",e)
        res.send(e);
    })
});
app.get('/statelist',(req,res)=>{
   state.find({}).then((data)=>{
       res.send(data)
   }).catch((e)=>{
       console.log("Error : ",e);
       res.send(e)
   })
});

app.post('/addcity',(req,res)=>{
    newCity=new city({
        cityname:req.body.cityname,
        stateid:req.body.stateid
    });

    newCity.save().then((data)=>{
        res.send(data)
    }).catch((e)=>{
        console.log("Eroor",e);
        res.send(e)
    })
})
app.get('/citylist',(req,res)=>{
    city.find({}).then((data)=>{
        res.send(data)
    }).catch((e)=>{
        console.log("Error : ",e);
        res.send(e)
    })
});
app.post('/findbystate',(req,res)=>{
    city.find({stateid:req.body.id}).then((data)=>{
        res.send(data);
    }).catch((e)=>{
        console.log("Error : ",e);
        res.send(e)
    })
})
app.listen('8585');


