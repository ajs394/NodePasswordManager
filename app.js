var express = require('express');
var session = require('express-session');
var flash = require("connect-flash");
var bodyParser = require("body-parser");
var multer = require("multer");
var cookieParser = require("cookie-parser");
var port = 3000;

function checkAuth (req, res, next) {
	console.log('checkAuth ' + req.url);

	// don't serve /secure to those not logged in
	// you should add to this list, for each and every secure url
	if (req.url === '/secure' && (!req.session || !req.session.authenticated)) {
		res.render('unauthorised', { status: 403 });
		return;
	}

	next();
}

var app = express();

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'jade');
app.use(flash());
app.use(checkAuth);

require('./routes/routes.js')(app);

app.listen(port);
console.log('Node listening on port %s', port);
