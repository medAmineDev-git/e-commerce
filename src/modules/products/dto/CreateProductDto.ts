import { IsString, IsNumber, IsOptional, IsArray, IsBoolean, IsPositive, Min } from 'class-validator';

export type Image = {
  url: string;
  alt: string
}
export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  category: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  rating?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  numReviews?: number;

  @IsArray()
  @IsOptional()
  images?: Image[];

  @IsArray()
  @IsOptional()
  colors?: string[];

  @IsArray()
  @IsOptional()
  sizes?: string[];

  @IsNumber()
  @Min(0)
  @IsOptional()
  discount?: number;

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;
}
