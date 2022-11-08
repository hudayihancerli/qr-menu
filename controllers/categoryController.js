const Category = require('../models/Category.js');
const Product = require('../models/Product')
const fs = require('fs');

exports.createCategory = (req,res) => {
    try{
        let date = Date.now();
        const uploadDir = 'public/uploads';

        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir);
        }

        let uploadImage = req.files.categoryImage;
        let uploadPath = __dirname + '/../public/uploads/' + date + '_Category_'+  uploadImage.name;

        uploadImage.mv(uploadPath, async () => {
            await Category.create({
                ...req.body,
                categoryImage: '/uploads/' + date + '_Category_'+  uploadImage.name
            })
        })

        res.status(200).redirect('/admin');
    }catch (error){
        res.status(200).render('404');
    }
}

exports.updateCategory = async (req,res) => {
    try{
        const category = await Category.findById({_id: req.params.id});

        category.categoryName = req.body.categoryName;

        category.save();

        res.status(201).redirect('/admin')
    }catch (error){
        res.status(200).render('404');
    }
}
 
exports.deleteCategory = async (req,res, next) => {
    try{

        const categoryD = await Category.findOneAndRemove({categorySlug: req.params.categorySlug});
        const products = await Product.find({productCategory: categoryD.id})

        await Product.deleteMany({productCategory: categoryD.id});

        fs.unlink( __dirname + '/../public' + categoryD.categoryImage, (err => {
            next()
        }));


        products.forEach(product => {0
            fs.unlink( __dirname + '/../public' + product.productImage, (err => {
                next()
            }));
        });

        res.status(200).redirect('/admin')

    }catch (error){
        res.status(200).render('404');
    }
}