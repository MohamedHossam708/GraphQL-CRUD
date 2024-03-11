import joi from"joi";

export const createProductSchema = joi.object({
    name:joi.string().min(2).max(30).required(),
    price:joi.number().required(),
    category:joi.string(),
    ProductDetails:joi.object({
        color:joi.string(),
        size:joi.string()
    })
})