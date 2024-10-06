import { Model } from 'mongoose';
import { Cart } from "../models/cart.model";
import { ProductPriceQuery } from "../models/cart.type";


export class CartRepositories {
  constructor(private readonly cartModel: Model<Cart>) {}

  async getCartWithProductsWithPriceConditionsQuery(userId: string, priceProductQuery: ProductPriceQuery): Promise<any> {
    return this.cartModel.aggregate([
      { $match: { user: userId } },
      {
        $lookup: {
          from: 'products',
          localField: 'items.product',
          foreignField: '_id',
          as: 'productDetails',
        },
      },

      { $unwind: '$items' },
      { $unwind: '$productDetails' },
      { $match: { 'productDetails.price': priceProductQuery } },

      {
        $group: {
          _id: '$_id',
          user: { $first: '$user' },
          items: {
            $push: {
              product: '$productDetails',
              quantity: '$items.quantity',
            },
          },
        },
      },
    ]);
  }
}
