const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const cons = require('consolidate');
const dust = require('dustjs-helpers');

const db = require('./config/database');

db.authenticate()
    .then(() => console.log('Connected'))
    .catch(err => console.log('Error' + err))

const app = express();

app.engine('dust', cons.dust);


app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", (req, res) => res.render('index'));

app.use('/users', require('./routes/routes'));


app.listen(3000, function(){
	console.log('Server Started On Port 3000');
});