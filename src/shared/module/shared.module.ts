import { forwardRef, Module } from "@nestjs/common";
import { ProductsModule } from "../../modules/products/products.module";
import { UserModule } from "../../modules/users/user.module";
import { HttpMockApiService } from "./services/httpMockApi.service";


@Module({
  imports: [
    forwardRef(() => ProductsModule),
    forwardRef(() => UserModule),
  ],
  providers: [HttpMockApiService],
  exports: [HttpMockApiService],
})
export class SharedModule {}
