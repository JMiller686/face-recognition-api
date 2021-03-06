const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : 'https://peaceful-bayou-24121.herokuapp.com/',
    user : '',
    password : '',
    database : 'face-recognition'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send("it is working"))

app.post('/signin', (req,res) => { signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req,res) => { profile.handleProfile(req,res)})

app.put('/image', (req,res) => { image.handleImage(req,res,db)})

app.post('/imageurl', (req,res) => { image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})
