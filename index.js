var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var User = require('./models/user');
var app = express();
var path = require('path');

var secret = "thesecretgarden";

mongoose.connect('mongodb://localhost:27017/gardens');


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// This restricts anything in this path, except POST
app.use('/api/users', expressJWT( //request must go through the secret: secret and pass otherwise breaks
    {
      secret: secret
    }
  ).unless( // only allows us to POST or CREATE A USER without expressJWT
    {
      method: "POST",
    }
  )
);

app.use('/api/gardens', expressJWT({secret: secret}));

app.use('/api/gardens', require('./controllers/gardens.js'));

// This customizes the error message for an unauthorized request
app.use(function (err, req, res, next) {
  // send an appropriate status code & JSON object saying there was an error, if there was one.
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({message: 'You need an authorization token to view this information.'})
  }
});

app.use('/api/users', require('./controllers/user.js'));


app.post('/api/auth', function(req, res) {
  
  User.findOne({email: req.body.email}, function(err, user) {
    // if (err || !user) return res.send({message: 'User not found'});
    if (err || !user) return err
    user.authenticated(req.body.password, function(err, result) {
      if (err || !result) return res.send({message: 'User not authenticated'});

      var token = jwt.sign(user, secret);
      res.send({user: user, token: token});
    });
  });
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT || 3000)