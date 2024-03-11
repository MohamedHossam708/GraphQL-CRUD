import { GraphQLSchema, GraphQLObjectType, GraphQLString ,GraphQLInt, GraphQLScalarType, GraphQLID, GraphQLList,GraphQLInputObjectType} from 'graphql';
import {  ProductModel } from '../../DataBase/Modules/ProductsModel.js';
import { validation } from '../utlis/validation.js';
import { createProductSchema } from './ProductsValidation.js';


export const getSingelProduct ={
    type:new GraphQLObjectType({
        name:"singleProduct",
        fields:{
            name:{type:GraphQLString},
            price:{type:GraphQLInt},
            category:{type:GraphQLString},
            _id:{type:GraphQLID},
            ProductDetails:{type:new GraphQLObjectType({
                name:"ProductDetails",
                fields:{
                    color:{type:GraphQLString},
                    size:{type:GraphQLString}
                }
            })}
        }

    }),
    args:{
        id:{type:GraphQLID}
    },

    resolve:async(parent,args)=>{
    const product = await ProductModel.findById(args.id)
    return product
    }
}


export const getAllProducts ={
    type:new GraphQLList(new GraphQLObjectType({
        name:"allProducts",
        fields:{
            name:{type:GraphQLString},
            price:{type:GraphQLInt},
            category:{type:GraphQLString},
            _id:{type:GraphQLID},
            ProductDetails:{type:new GraphQLObjectType({
                name:"ProductsDetails",
                fields:{
                    color:{type:GraphQLString},
                    size:{type:GraphQLString}
                }
            })}
        }

    })),
    resolve:async()=>{
    const products = await ProductModel.find({})
    return products
    }
    
}

export const createProduct={
    type:new GraphQLObjectType({
        name:"CreateProduct",
        fields:{
            name:{type:GraphQLString},
            price:{type:GraphQLInt},
            category:{type:GraphQLString},
            _id:{type:GraphQLID},
            ProductDetails:{type:new GraphQLObjectType({
                name:"crateProductDetails",
                fields:{
                    color:{type:GraphQLString},
                    size:{type:GraphQLString}
                }
            })}
        }

    }),
    args:{
        name:{type:GraphQLString},
        price:{type:GraphQLInt},
        category:{type:GraphQLString},
        ProductDetails:{
            type:new GraphQLInputObjectType({ 
            name:'args',
            fields:{
            color:{type:GraphQLString},
            size:{type:GraphQLString}}
            })}
           
        
    },

    resolve:async(parent,args)=>{
        await validation(createProductSchema,args)
        const {name , price , category , ProductDetails}=args
        const product = await ProductModel.create({name , price , category , ProductDetails})
        return product
    }
}

export const DeleteProduct={
    type: new GraphQLObjectType({
        name:"DeleteProductType",
        fields:{
            message:{type:GraphQLString}
        }
    }),
    args:{id:{type:GraphQLID}},
    resolve:async(parent,args)=>{
        const products = await ProductModel.findByIdAndDelete(args.id)
        return{message:"Product Deleted Successfully"}
    }
}

export const UpdateProduct={
    type:new GraphQLObjectType({
        name:"UpdateProduct",
        fields:{
            _id:{type:GraphQLID},
            name:{type:GraphQLString}
        }
    }),
    args:{
        id:{type:GraphQLID},
        name:{type:GraphQLString}
    },
    resolve:async(parent,args)=>{
        const product = await ProductModel.findByIdAndUpdate(args.id ,{name:args.name},{new:true})
        return product
        

    }
}