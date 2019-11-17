const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '..', 'data', 'products.json');

module.exports = class Product {
    constructor(prodId, name, imageUrl, price, desc) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.price = price;
        this.desc = desc;
        this.prodId = prodId;
    }

    save() {
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
            }
            if (this.prodId) {
                const i = products.findIndex(prod => prod.prodId === this.prodId);
                const updatedProducts = [...products];
                updatedProducts[i] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    console.log(err)
                })
            } else {
                this.prodId = Math.floor(Math.random() * 10000).toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        })
    }

    static fetchAll(callback) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
             return callback([]);
            }
            callback(JSON.parse(fileContent));
        });
    }
    
    static findById(prodId, callback) {
        
        fs.readFile(p, (err, fileContent) => {
            let products = [...JSON.parse(fileContent)];
            let product = products.find(prod => prod.prodId === prodId);
            callback(product);
        });
    }

    static deleteProduct(prodId) {
        fs.readFile(p, (err, fileContent) => {
            let products = [...JSON.parse(fileContent)].filter(prod => prod.prodId !== prodId);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        })
    }
};