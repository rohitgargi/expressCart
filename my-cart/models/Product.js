function Product(title,desc,price,imgPath,id){
    this.title = title;
    this.id = id;
    this.desc = desc;
    this.price = price;
    this.imgPath = imgPath;
}

module.exports = Product;