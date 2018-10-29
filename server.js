const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const social = require('./controllers/social');
const update = require('./controllers/update');
const deleteuser = require('./controllers/deleteuser');
//const url = 'https://s3.ap-south-1.amazonaws.com/scapic-others/json/models.json'

app.use(cors());
const db = knex({
  client: 'pg', 
  connection: {
  	connectionString : process.env.DATABASE_URL,
    ssl : true
  }
});



app.use(bodyParser.json());



app.get('/',(req,res)=>{res.send('it is working')})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,bcrypt,db)})

app.post('/register',(req,res)=>{register.handleRegister(req,res,bcrypt,db)})

app.post('/social',(req,res)=>{social.handleSocial(req,res,db)})

app.put('/update',(req,res)=>{update.handleUpdate(req,res,bcrypt,db)})

app.delete('/deleteuser',(req,res)=>{deleteuser.handleDelete(req,res,db)})

app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})

app.listen(process.env.PORT || 3000, ()=>{
	console.log(`app is running in ${process.env.PORT}`);
})



//  /  -->res = this is working
// /signin --> POST =success/fail
// /register --> POST = user
//  /social --> post = user
//  /profile/:userId -->GET =user
// app.put('/update',(req,res) =>{
// 	const {id,name,email,password} = req.body;
// 	const hash = bcrypt.hashSync(password)
// 	db('users')
// .where('id', id)
// .returning('*')
// .update({
// 	email: email,
// 	name:name
// })
// .then(user=>{
// 	db('login')
// 	.where('id', user[0].id)
// 	.returning('*')
// 	.update({
// 	email: email,
// 	hash :hash
// })
// 	.then(user=>{

// 		res.json(function(){
// 		db.select().from('users')
// 		.where('id',user[0].id)
// 	});
// 	})
// 	.catch(err=>res.status(400).json('Cannot update the Profile'))
	
// })
// .catch(err=>res.status(400).json('Cannot update the Profile'))
// })
// 