const fs = require('fs');
module.exports = function Cart(cartObj){
    // var items = oldCart.items || [];
    // var totalPrice = oldCart.totalPrice || 0;
    // var totalQty = oldCart.totalQty || 0;
    oldCart = cartObj.cart;
   var add = function(product,productId){
       var index = null;
       if(oldCart.items && oldCart.items.length){
        index = oldCart.items.map(function(o) { return o.id; }).indexOf(productId);
       }
       console.log(index)
        if(index){
            oldCart.items[index].qty++;
            oldCart.items[index].price = product.price * oldCart.items[index].qty;
            oldCart.totalQty++;
            oldCart.totalPrice +=product.price;
        }else{
            oldCart.items.push({
                "title": product.title,
                "description": product.description,
                "price": product.price,
                "qty":1
            });
            oldCart.totalQty++;
            oldCart.totalPrice += product.price;
        }

        console.log(oldCart)
    }

    var getCart = function(){
        fs.readFile('../jsons/cart.json',function(serviceReq,response){
            var parsedRes = JSON.parse(response);
            return parsedRes;
          });
    }

    return {
        "addToCart":add,
        "getCart":getCart,
        "oldCart":oldCart
    }
}