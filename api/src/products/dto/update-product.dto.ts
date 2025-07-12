import { IsString, IsNumber, IsOptional, IsArray, Min, IsObject, IsBoolean } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stockQuantity?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsOptional()
  @IsObject()
  variants?: Record<string, any>;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}