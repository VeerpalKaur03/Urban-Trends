import { Cart } from "../models/cart.model";

export class CartAdapter{
    static fromApi(data:any):Cart{
         return {
          id: data.id,
          userId: data.user_id,
          productId: data.product_id,
          quantity: data.quantity,
          product: data.product
        }
    }


    static toApi(cartValue:any){
       return{
        id:cartValue.id,
        user_id:cartValue.userId,
        product_id:cartValue.productId,
        quantity:cartValue.quantity,
        product:cartValue.product
       }

    }
}