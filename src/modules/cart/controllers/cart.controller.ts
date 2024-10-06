import { Controller, Post, Body, Param, Get, Patch } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { CreateCartDto } from '../dto/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('hello')
  getHello(): string {
    return 'Hello World';
  }

  @Post('create')
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

/*  @Patch('add/:userId/:productId')
  addToCart(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.cartService.addToCart(userId, productId, quantity);
  }*/

  @Get(':userId')
  getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Get(':userId/:condition/:price')
  getCartWithProductsWithPriceConditions(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }
}
