import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import HandleRegister from './Controller/Register.js';
import HandleSignIn from './Controller/SignIn.js';
import Clarifai from 'clarifai';


const apt = new Clarifai.App({
    apiKey: 'a1ee17346a5544cdb4c7b50e61b3a9e8'
   });

const handleApi =(req, res)=>{   
   apt.models.predict(Clarifai.FACE_DETECT_MODEL,
    req.body.input).then(data=>{console.log("We are here"); res.json(data)}).catch(err=> res.status(400).json('Unable to fetch'))

}


const postgres = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : '1234',
      database : 'smart_brain'
    }
  });

postgres.select('*').from('users').then(data=>{console.log(data)});

const app = express();

app.use(express.json());
app.use(cors());


const database={
    users:[
    {
        id:'123',
        name:'pouria',
        email:'pouria@gmail.com',
        password:'red',
        entries:0,
        joined: new Date()
    },
    {
        id:'124',
        name:'john',
        email:'john@gmail.com',
        password:'blue',
        entries:0,
        joined: new Date()
    }
]}


app.get('/',(req,res)=>{
    res.send(database.users);
})

app.post('/signin',(req,res)=>{ HandleSignIn(req,res,postgres,bcrypt)})
    

app.get('/profile/:id',(req,res)=>{
    const {id}=req.params;
    let found = false;
    postgres.select('*').from('users').where({id:id}).
    then(data=>{
        if(data.length){
            res.json(data[0]);
        }else{
            res.status(400).json('User Not Found');
        }
    }).catch(err => {res.status(400).json("Error Connecting to Database")});

})

app.put('/image',(req,res)=>{
    const {id}=req.body;
    postgres('users').where('id','=',id).increment('entries',1).
    returning('entries').then(data => {console.log('from image the entries is:',data[0].entries); res.json(data[0].entries)}).catch(err => {res.status(400).json('Error Increasing')})

})

app.post('/imageurl',(req,res)=>{
    handleApi(req,res);
})

app.post('/register',(req,res)=>{HandleRegister(req,res,postgres,bcrypt)})

app.listen(3002);