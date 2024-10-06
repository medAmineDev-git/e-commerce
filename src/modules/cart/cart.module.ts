import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SharedModule } from "../../shared/module/shared.module";
import { CartSchema } from "./models/cart.model";
import { CartController } from "./controllers/cart.controller";
import { CartService } from "./services/cart.service";
import { CartRepositories } from "./repositories/cart.repositories";
import { ProductsModule } from "../products/products.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }]),
    forwardRef(() => SharedModule),
    ProductsModule
  ],
  controllers: [CartController],
  providers: [CartService, CartRepositories],
  exports: [CartService],
})
export class CartModule {}
