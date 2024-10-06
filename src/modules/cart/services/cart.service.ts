import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from "../models/cart.model";
import { CreateCartDto } from "../dto/create-cart.dto";
import { ProductsService } from "../../products/services/products.service";
import { CartRepositories } from "../repositories/cart.repositories";
import { ProductPriceQuery } from "../models/cart.type";




@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private productService: ProductsService,
    private cartRepositories: CartRepositories,
  ) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const { user, items } = createCartDto;

    const cart = new this.cartModel({
      user,
      items,
    });
    return cart.save();
  }

  async addToCart(userId: string, productId: string, quantity: number): Promise<Cart> {
    const cart = await this.cartModel.findOne({ user: userId }).exec();
    if (!cart) throw new NotFoundException('Cart not found');

    const product = await this.productService.findOne(productId);
    if (!product) throw new NotFoundException('Product not found');

    const existingItem = cart.items.find(item => item.product.id == productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: product, quantity });
    }

    return cart.save();
  }

  async getCart(userId: string): Promise<Cart> {
    return this.cartModel.findOne({ user: userId }).populate('items.product').exec();
  }

   async getCartWithProductsWithPriceConditions(userId: string, priceProductQuery: ProductPriceQuery): Promise<Cart> {
     return this.cartRepositories.getCartWithProductsWithPriceConditionsQuery(userId, priceProductQuery);
   }
}
