import { IsNotEmpty, IsMongoId, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CartItemDto {
  @IsMongoId()
  @IsNotEmpty()
  product: string;

  @IsNotEmpty()
  quantity: number;
}

export class CreateCartDto {
  @IsMongoId()
  @IsNotEmpty()
  user: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  items: CartItemDto[];
}
