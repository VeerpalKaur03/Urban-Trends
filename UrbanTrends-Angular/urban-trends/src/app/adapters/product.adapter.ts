import { Product } from "../models/product.model";

export class ProductAdapter {
   static fromApi(data:any):Product{
    return{
        id:data.id,
        name:data.name,
        description:data.description,
        price:data.price,
        category:data.category,
        imageUrl: data.image_url
    }
   }
}