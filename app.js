const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const Product = require('./models/product-data');
const User = require('./models/user-data');
const Cart = require('./models/cart-data');
const CartItem = require('./models/cart-item-data');
const Order = require('./models/order-data');
const OrderItem = require('./models/order-item-data');

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');

const app = express();


app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('admin/404.ejs', { pageTitle: "404 Error!!"});
})

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });



sequelize.sync()
    .then(result => {
        return User.findByPk(1)
    })
    .then(user => {
        if (!user) {
            return User.create({
                name: 'David',
                email: 'dvlv212@gmail.com'
            })
        }
        return Promise.resolve(user);
    })
    .then(user => {
        user.createCart();
        app.listen(5000);
    })
    .catch(err => console.log(err));

