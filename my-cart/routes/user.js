var express = require('express');
var router = express.Router();
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/signup',function(req, res,  next){
    res.render('user/signup',{
      csrfToken : req.csrfToken
    });
  });
  
  router.post('/signup',function(req, res,  next){
    res.redirect('/user/profile');
  });
  
  
  router.get('/profile',function(req, res,  next){
    res.render('user/profile');
  });
  
  
  router.get('/signin',function(req, res,  next){
    res.render('user/signin',{
      csrfToken : req.csrfToken
    });
  });
  
  router.post('/signin',function(req, res,  next){
    res.redirect('/user/profile');
  });
  


  module.exports = router;