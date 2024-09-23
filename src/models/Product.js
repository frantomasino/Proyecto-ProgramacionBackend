import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    categoria: { type: String, required: true },
    thumbnails: { type: [String], default: [] }  
});

const Product = mongoose.model('Product', productSchema);

export default Product;
