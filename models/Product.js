const { default: mongoose } = require('mongoose');
const moongose =  require('mongoose');

const Schema = moongose.Schema;

const ProductSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        require: true,
        trim: true
    },
    productPrice:{
        type: Number,
    },
    productImage: {
        type: String,
    },
    productCreateAt: {
        type: Date,
        default: Date.now
    },
    productCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    
});


const product = mongoose.model('Product', ProductSchema);

module.exports = product;