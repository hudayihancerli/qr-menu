const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slugify = require('slugify');

const CategorySchema = new Schema({
    categoryName:{
        type: String,
        unique: true
    },

    categoryImage: String,

    categoryCreateAt: {
        type: Date,
        default: Date.now
    },
    categorySlug: {
        type: String,
        unique: true
    }

});


CategorySchema.pre('validate', function(next){
    this.categorySlug = slugify(this.categoryName, {
        lower:true,
        strict:true
    })
    next()
})


const Category = mongoose.model('Category', CategorySchema); //new

module.exports = Category;