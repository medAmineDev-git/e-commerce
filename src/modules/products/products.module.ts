import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsController } from "./controllers/products.controller";
import { ProductsService } from "./services/products.service";
import { Product, ProductSchema } from "./models/product.model";
import { SharedModule } from "../../shared/module/shared.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    forwardRef(() => SharedModule)
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
