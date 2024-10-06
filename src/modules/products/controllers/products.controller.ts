import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/CreateProductDto';
import { UpdateProductDto } from '../dto/UpdateProductDto';
import { HttpMockApiService } from "../../../shared/module/services/httpMockApi.service";

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly httpMockService: HttpMockApiService) {}

  @Get('hello')
  getHello(): string {
    return 'Hello products';
  }

  @Get('createMock')
  async testCreateProduct() {
    return  this.httpMockService.createMock('Samsung S24 Ultra');
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
