const Category = require('../models/Category.js');
const Product = require('../models/Product.js');

const fs = require('fs');

exports.createProduct = (req,res) => {
    try {
        let date = Date.now();
        const uploadDir = 'public/uploads';

        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir);
        }

        let uploadImage = req.files.productImage;
        let uploadPath = __dirname + '/../public/uploads/'  + date + '_Product_'+  uploadImage.name

        uploadImage.mv(uploadPath, async () => {
            await Product.create({
                ...req.body,
                productImage: '/uploads/' +  date + '_Product_'+  uploadImage.name
            })
        })

        res.redirect('/admin');
    }catch (error){
        res.status(200).render('404');
    }
}

exports.getProductInCategory = async (req,res) => {
    try {
        const categorySort =  await Category.find().sort('-categoryCreateAt');
        const product = await Product.find().populate('productCategory');
        const dateYear = new  Date().getFullYear();
        const CategoryInProduct = [];

        product.forEach(product => {
            
            if(product.productCategory.categorySlug === req.params.categorySlug){
                CategoryInProduct.push(product)
                
            }
        });
       

        res.status(200).render('category', {
            categorySort,
            CategoryInProduct,
            dateYear
        });

    }catch (error){
        res.status(200).render('404');
    }
}

exports.deleteProduct = async (req,res) => {
    try {
       const productDelete =  await Product.findOneAndRemove({_id: req.params.id});

        
        fs.unlink( __dirname + '/../public' + productDelete.productImage, (err) => {
            res.status(200).render('404');
        });

 
        res.status(200).redirect('/admin')
    }catch (error){
        res.status(200).render('404');
    }
}

exports.updateProduct = async (req,res) => {
    try {
        const product = await Product.findById({_id: req.params.id});

        product.productName = req.body.productName;
        product.productDescription = req.body.productDescription;
        product.productPrice = req.body.productPrice;
        product.productCategory = req.body.productCategory;
        

        product.save();

        res.status(201).redirect('/admin')
        
    }catch (error){
        res.status(200).render('404');
    }

}