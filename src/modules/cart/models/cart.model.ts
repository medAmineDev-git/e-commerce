import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { User } from "../../users/models/user.model";
import { Product } from "../../products/models/product.model";

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop([{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
  }])
  items: {
    product: Product;
    quantity: number;
  }[];

  @Prop({ default: 0 })
  totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

// Add the pre-save hook to automatically calculate the total price
CartSchema.pre<Cart>('save', async function (next) {
  const cart = this;

  // Reset the totalPrice to 0
  cart.totalPrice = 0;

  // Calculate the total price of all items
  for (const item of cart.items) {
    const product = await mongoose.model('Product').findById<Product>(item.product) as Product;
    if (product) {
      cart.totalPrice += product.price * item.quantity;
    }
  }

  next();
});
