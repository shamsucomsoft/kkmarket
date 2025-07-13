import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async findAll(@Query() query: any) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() createProductDto: CreateProductDto) {
    // TODO: Get vendorId from user's vendor profile
    const vendorId = req.user.userId; // This should be the vendor's ID
    return this.productsService.create(vendorId, createProductDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Request() req, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    // TODO: Get vendorId from user's vendor profile
    const vendorId = req.user.userId; // This should be the vendor's ID
    return this.productsService.update(id, vendorId, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Request() req, @Param('id') id: string) {
    // TODO: Get vendorId from user's vendor profile
    const vendorId = req.user.userId; // This should be the vendor's ID
    return this.productsService.delete(id, vendorId);
  }

  @Get('vendor/my-products')
  @UseGuards(JwtAuthGuard)
  async findMyProducts(@Request() req) {
    // TODO: Get vendorId from user's vendor profile
    const vendorId = req.user.userId; // This should be the vendor's ID
    return this.productsService.findByVendor(vendorId);
  }
}