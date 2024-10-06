import mongoose from 'mongoose';

import { UserSchema } from "../modules/users/models/user.model";
import { ProductSchema } from "../modules/products/models/product.model";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { CartService } from "../modules/cart/services/cart.service";
import { Cart } from "../modules/cart/models/cart.model";

async function seedCarts() {

  try {
    // Connect to your MongoDB (adjust the connection string accordingly)
    const app = await NestFactory.createApplicationContext(AppModule);
    const cartService = app.get(CartService);
    await mongoose.connect('mongodb://grinemedamine:c9InFkuTmf2NBrRY@maincluster-shard-00-00.rpdn5.mongodb.net:27017,maincluster-shard-00-01.rpdn5.mongodb.net:27017,maincluster-shard-00-02.rpdn5.mongodb.net:27017/?ssl=true&replicaSet=atlas-32iptc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=mainCluster&dbname=e-commerce');
    mongoose.model('User', UserSchema); // Register the User schema
    mongoose.model('Product', ProductSchema); // Register the Prodcut schema

    // Find users and products to reference in the cart
    const user = await mongoose.model('User').findOne();  // Fetch one user from the database
    const products = await mongoose.model('Product').find();  // Fetch all products

    console.log('user',user);
    if (!user || products.length === 0) {
      console.error('No users or products found to seed carts!');
      return;
    }

    // Example cart items with products and quantities
    const cartItems = products.map((product, index) => ({
      product: product._id,  // Referencing product by _id
      quantity: Math.floor(Math.random() * 5) + 1,  // Random quantity between 1 and 5
    }));

    // Calculate total price based on product price and quantity
    const totalPrice = cartItems.reduce((sum, item) => {
      const product = products.find(p => p._id.equals(item.product));
      return sum + (product.price * item.quantity);
    }, 0);

    // Create a new cart
    const cart = {
      user: user._id,  // Referencing the user by _id
      items: cartItems,
      totalPrice,
    };

    // Save the cart to the database
    await cartService.create(cart)

    console.log('Cart seeded successfully!');
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding cart:', error);
    await mongoose.connection.close();
  }
}

seedCarts().then(r => console.log(r));
