import { IsString, IsNumber, IsOptional, IsArray, Min, IsObject } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stockQuantity: number;

  @IsString()
  category: string;

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsOptional()
  @IsObject()
  variants?: Record<string, any>;
}