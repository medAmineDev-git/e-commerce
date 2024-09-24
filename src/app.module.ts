import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from "./modules/products.module";
import { ProductsController } from "./modules/products/controllers/products.controller";
import { ProductsService } from "./modules/products/services/products.service";


//c9InFkuTmf2NBrRY

@Module({
  imports: [
  // MongooseModule.forRoot('mongodb+srv://grinemedamine:c9InFkuTmf2NBrRY@maincluster.rpdn5.mongodb.net/?retryWrites=true&w=majority&appName=mainCluster'),
   MongooseModule.forRoot('mongodb://grinemedamine:c9InFkuTmf2NBrRY@maincluster-shard-00-00.rpdn5.mongodb.net:27017,maincluster-shard-00-01.rpdn5.mongodb.net:27017,maincluster-shard-00-02.rpdn5.mongodb.net:27017/?ssl=true&replicaSet=atlas-32iptc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=mainCluster'),
    ProductsModule,
    AppModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
