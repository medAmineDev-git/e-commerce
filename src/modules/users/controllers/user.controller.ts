import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { HttpMockApiService } from "../../../shared/module/services/httpMockApi.service";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../dto/createUserDto";
import { UpdateUserDto } from "../dto/updateUserDto";

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly httpMockService: HttpMockApiService
  ) {}

  @Get('hello')
  getHello(): string {
    return 'Hello World';
  }

  @Get('all')
  async getUserAndProducts() {
    return  this.httpMockService.getData();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
