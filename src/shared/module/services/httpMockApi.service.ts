import { Injectable } from "@nestjs/common";
import { ProductsService } from "../../../modules/products/services/products.service";
import { CreateProductDto } from "../../../modules/products/dto/CreateProductDto";
import { Product } from "../../../modules/products/models/product.model";
import { UserService } from "../../../modules/users/services/user.service";

@Injectable()


export class  HttpMockApiService {
  constructor(private productService: ProductsService, private userService: UserService) {
  }

   async createMock(name: string): Promise<Product> {
    const product: CreateProductDto = {
      name: name,
      description: 'new Samsung with ERROR',
      price: null,
      category: 'Electronics',
      brand: 'SoundTech',
      stock: 150,
      rating: 4.5,
      numReviews: 200,
      images: [
        {
          url: 'https://example.com/images/wireless-headphones-front.jpg',
          alt: 'Front view of Wireless Headphones',
        },
        {
          url: 'https://example.com/images/wireless-headphones-side.jpg',
          alt: 'Side view of Wireless Headphones',
        },
      ],
      colors: ['Black', 'White', 'Blue'],
      discount: 10,
      isFeatured: true,
    };

   return await this.productService.create(product as CreateProductDto);
    /*createdObject.then(data => {
      console.log('created data');
      console.log(data);
    })*/
      //return  await createdObject;
  }

  async getData() {
    const products = await this.productService.findAll();
    const users = await this.userService.findAll();
    return { products, users };
  }
}