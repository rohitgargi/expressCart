var express = require('express');
var router = express.Router();
var xhr = require("xhr");
const fs = require('fs');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

/* GET home page. */
router.get('/', function(req, res, next) {

  xhr.open("GET", "/products", true);
  xhr.send();


  fs.readFile('jsons/products.json',function(serviceReq,response){
    var parsedRes = JSON.parse(response);
    const products = parsedRes.products;
    var productList = [];
    for(var i= 0; i<parsedRes.products.length;i++){
      productList[i] = new Product(products[i].title,products[i].description,products[i].price,products[i].imgPath,products[i].id)
    }
    res.render('shop/index', { 
      title: 'Shopping cart' ,
      products : productList
    });
  });
});

router.get("/add-to-cart/:id",function(req,  res,  next) {
  var productList =[];
  fs.readFile('jsons/products.json',function(productReq,productRes){
    var parsedRes = JSON.parse(productRes);
     productList = parsedRes.products;


     fs.readFile('jsons/cart.json',function(cartReq,cartRes){
      var parsedRes = JSON.parse(cartRes);
      var cartFactory = Cart(parsedRes); 
      var selectedProduct = productList.filter(function(obj){
        return parseInt(req.params.id) === parseInt(obj.id)
      })[0];
      console.log(selectedProduct)
      cartFactory.addToCart(selectedProduct,parseInt(req.params.id));
      res.redirect('/');
    });
  })
  
});


module.exports = router;

