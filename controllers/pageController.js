const Category = require('../models/Category.js');
const Product = require('../models/Product.js');
const User = require('../models/User.js');

exports.getIndexPage = async (req,res) => {
    try {
        const dateYear = new  Date().getFullYear();
        const categorySort =  await Category.find({}).sort('-categoryCreateAt');
        const product =  await Product.find({}).sort('-productCreateAt').populate('productCategory');
        res.render('index',{
            categorySort,
            product,
            dateYear
        });
    } catch (error) {
         res.status(200).render('404')   
    }
    
}

exports.getAdminPage = async (req,res) => {
    try {
        const categorySort =  await Category.find({}).sort('-categoryCreateAt');
        const productSort =  await Product.find({}).sort('-productCreateAt').populate('productCategory');
        
        const users = await User.find();

        const sessionUserID =req.session.userID 
            
        res.render('admin',{
            categorySort,
            productSort,
            users,
            sessionUserID
        });
    } catch (error) {
        res.status(200).render('404')   
    }
}

exports.getCreateCategoryPage = async (req,res) => {
    try {
        const categorySort =  await Category.find({}).sort('-categoryCreateAt');
        const users = await User.find();
        const sessionUserID =req.session.userID;
        res.render('createCategory',{
             categorySort,
             sessionUserID,
             users
        });
    } catch (error) {
        res.status(200).render('404')   
    }
}

exports.getCreateProductPage = async (req,res) => {
    try {
        const category =  await Category.find({})
        const productSort =  await Product.find({});
        const users = await User.find();
        const sessionUserID =req.session.userID 
        res.render('createProduct', {
            productSort,
            category,
            sessionUserID,
            users
        });
    } catch (error) {
        res.status(200).render('404')   
    }
}

exports.getUpdateProductPage = async (req,res) => {
    try {
        const productSort =  await Product.findById({_id: req.params.id});
        const category =  await Category.find({});
        const users = await User.find();
        const sessionUserID =req.session.userID 
        res.render('updateProduct', {
            productSort,
            category,
            sessionUserID,
            users
        });
    } catch (error) {
        res.status(200).render('404')   
    }
}

exports.getUpdateCategoryPage = async (req,res) => {
    try {
        const category =  await Category.findById({_id: req.params.id});
        const users = await User.find();
        const sessionUserID =req.session.userID 
        res.render('updateCategory', {
            category,
            sessionUserID,
            users
        });
    } catch (error) {
        res.status(200).render('404')   
    }
}

exports.getLoginPage = async (req,res) => {
    const users = await User.find();

    res.status(200).render('login',{
        users
    })


}