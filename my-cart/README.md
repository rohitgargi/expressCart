express my-cart  --hbs   /// hbs flag for handle bar templating engine
npm install  ///for dependancy
npm start /// to start node server


remove user from routes folder and in app.js where it is given

add bootstrap cdn in views> layout.hbs
add jquery cdn 


Now create a partial folder  inside views

... views> partials> header.hbs

go to bootstrap> components> navbar........copy and paste the code inside header.hbs



Now installl handlebar template engine

npm install --save express-handlebars 

Once handlebars are installed ... Go to app.js and declare handlebars 
like this     var expressHbs = require('express-handlebars')




then in app.js iteself... Set the view engine 

app.engine('.hbs',expressHbs({
  defaultLayout: 'layout', extname:'.hbs'
}));

correct app.set('view engine', 'hbs');  to app.set('view engine', '.hbs');


and then create new folder name as 'layouts' inside view folder and then move layout.hbs inside this folder



Now we can include our header.hbs in layout so that we can see it on page

goto > layout.hbs

jst above {{{body}}} write this code >>    {{> header}}          /// > will look for adjecent folder i.e partials and then header





/// Sign up   ====video 6
add folder views> user > signup.hbs , signin.hbs, profile.hbs
for csrf token .... npm i csurf --save
in index.js add follwing
var csrf = require('csurf');

var csrfProtection = csrf();

add router for sigup page in index.js
router.get('/user/signup',function(req, res,  next){
  res.render('user/signup',{
    csrfToken : req.csrfToken
  })
});

We need session for csrf to work
npm i express-session --save

go to app.js
add following lines
var session = require('express-session');

and in middleware section below cooke parser add these lines

app.use(session({
  secret:'mySuperKey', resave:false, saveUninitialized : false
}));

// secret : key name.....reSave : save session on each request on server .......saveUninitialized : save session even though session is nt intialized


Now finally go to index.js

add this line after csrfProtection variable

router.use(csrfProtection) //// This will ensure tht all the routes are protected with csrf protection


now in ur signup.hbs  add <input type="hidden" name="_csrf" value="{{csrfToken}}"> inside form 

and in index.js  >>> new router on form button click

router.post('/user/signup',function(req, res,  next){
  res.redirect('/');
})

this way u can check


