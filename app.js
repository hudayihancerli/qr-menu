const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo');

global.userIN = null;



//dotenv
require('dotenv').config();


// controller
const pageController = require('./controllers/pageController.js');
const categoryController = require('./controllers/categoryController');
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');

const app = express();

mongoose.connect(process.env.MONGO_URL)

//template engine
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // url'deki datayı okuyor
app.use(express.json()); // url'deki datayı json'a çeviriyor
app.use(fileUpload());
app.use(session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}))
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}))
app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next();
})



// router
    // get
app.get('/', pageController.getIndexPage);
app.get('/admin', pageController.getAdminPage);
app.get('/login', pageController.getLoginPage);

app.get('/admin/createCategory', pageController.getCreateCategoryPage);
app.get('/admin/createProduct', pageController.getCreateProductPage);

app.get('/category/:categorySlug',productController.getProductInCategory);

app.get('/admin/updateProduct/:id', pageController.getUpdateProductPage);
app.get('/admin/updateCategory/:id', pageController.getUpdateCategoryPage);

app.get('/logout', userController.logoutUser)
    // post
app.post('/admin/createCategory', categoryController.createCategory);
app.post('/admin/createProduct', productController.createProduct);
app.post('/login', userController.login)

    //put   
app.put('/admin/updateProduct/:id', productController.updateProduct);
app.put('/admin/updateCategory/:id', categoryController.updateCategory)

    //delete
app.delete('/admin/deletecategory/:categorySlug', categoryController.deleteCategory)
app.delete('/admin/deleteProduct/:id', productController.deleteProduct)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App -> http://localhost:${port}`)
})