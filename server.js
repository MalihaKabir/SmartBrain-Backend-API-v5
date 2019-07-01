const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profileID');
const imgEntry = require('./controllers/imgEntry');

const db = knex({
	client     : 'pg',
	connection : {
		host     : '127.0.0.1',
		user     : 'postgres',
		password: 'Your_Database_Password', // must use your own postgres password
		database : 'smartbrainapp',
	},
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// basic/root route:
app.get('/', (req, res) => {
	// res.send('this is working!');
	res.send(database.users);
});

// signin route: (with advanced function)
app.post('/signin', signin.handleSignin(db, bcrypt));

// register/new user route:
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));

// id of users:
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db));

// image entry count:
app.put('/image', (req, res) => imgEntry.handleImgEntries(req, res, db));
app.post('/imageurl', (req, res) => imgEntry.handleApiCall(req, res));

app.listen(3001, () => {
	console.log('app is running on port 3001');
});

// Things To-Do:
// root route('/') --> GET --> res = this is working,
// signin route --> POST --> res = success/fail,
// register --> POST --> return = user,
// profile/:userId --> GET --> ret = user,
// image (end point) --> PUT --> res = count/entries.
