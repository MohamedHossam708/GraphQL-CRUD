import mongoose from "mongoose";



const schema = new mongoose.Schema({
    name:{type:String},
    price:{type:Number},
    category:{type:String},
    ProductDetails:{
        color:{type:String},
        size:{type:String}
    }
    
    
})

export const ProductModel = mongoose.model("Product",schema)