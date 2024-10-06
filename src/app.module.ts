import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from "./modules/products/products.module";
import { UserModule } from "./modules/users/user.module";
import { SharedModule } from "./shared/module/shared.module";
import { CartModule } from "./modules/cart/cart.module";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://grinemedamine:c9InFkuTmf2NBrRY@maincluster-shard-00-00.rpdn5.mongodb.net:27017,maincluster-shard-00-01.rpdn5.mongodb.net:27017,maincluster-shard-00-02.rpdn5.mongodb.net:27017/?ssl=true&replicaSet=atlas-32iptc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=mainCluster&dbname=e-commerce'),
    ProductsModule,
    UserModule,
    CartModule,
    SharedModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
