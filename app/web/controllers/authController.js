var bcrypt = require('bcrypt-nodejs');
var db = require('../config/dbConfig.js');

exports.createUser = function(req, res){
  console.log(req.body);
  var username = req.body.username;
  var password = req.body.password;

  db.cypher({
    query: 'MATCH (a:User) where a.username = {username} RETURN a',
    params: { username }
  }, function(err, result) {
    if(err) console.log('err', err);
    if(result.length === 0) {
      bcrypt.hash(password, null, null, function(err, hash) {
        db.cypher({
          query: 'CREATE (a:User { username: {username}, password: {hash} })',
          params: { username, hash }
        }, function(err, result) {
          if(err) console.log('err', err);
          req.session.regenerate(function(){
            req.session.user = req.body.username;
            res.sendStatus(201);
          });
        });
      })
    } else res.sendStatus(409);
  });
}

exports.checkUser = function(req, res, next) {
  console.log("checking user", req.session)
  if (!(req.session ? !!req.session.user : false)) res.sendStatus(401);
  else next();
};


exports.checkPassword = function(req, res){
  console.log('login', req.body.username, req.body.password);
  var username = req.body.username;
  var password = req.body.password;

  db.cypher({
    query: 'MATCH (a:User) WHERE a.username = {username} RETURN a',
    params: {username}
  }, function(err, result) {
    if(err) console.log(err);
    if(result[0]) {
      let user = result[0].a;
      console.log(user)
      bcrypt.compare(req.body.password, user.properties.password, function(err, result){
        if(result)
          req.session.regenerate(function(){
            req.session.user = user.properties.username;
            res.sendStatus(200);
          });
        else res.sendStatus(401);
      });
    } else {
      res.sendStatus(401);
    }
  });
}

exports.destroySession = function(req, res) {
  req.session.destroy();
  res.redirect("/");
  console.log("destroyed")
}
