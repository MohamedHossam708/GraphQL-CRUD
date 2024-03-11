import { GraphQLSchema, GraphQLObjectType, GraphQLString ,GraphQLInt, GraphQLScalarType, GraphQLID, GraphQLList,GraphQLInputObjectType} from 'graphql';

import { DeleteProduct, UpdateProduct, createProduct, getAllProducts, getSingelProduct } from './Products/productType.js';




export const schema = new GraphQLSchema({
    // Query contains the Read operations onlt ( equall to get in restfulApis)
    query:new GraphQLObjectType({
        name:"rootQuery",
        fields:{
            // get single Product
            singleProduct:getSingelProduct,
                
          
            allProducts:getAllProducts
        }
    }),
    // mutations contains all the other CRUD opetaions (Post , Update , Delete)
    mutation:new GraphQLObjectType({
        name:"rootMutation",
        fields:{
            // create product
            CreatePorduct:createProduct,
            // Delete product
            DeleteProduct:DeleteProduct,
            //Update Product
            UpdateProduct:UpdateProduct,
        }
    })
})