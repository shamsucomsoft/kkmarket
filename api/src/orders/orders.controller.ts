import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(req.user.userId, createOrderDto);
  }

  @Get()
  async findAll(@Request() req) {
    return this.ordersService.findAll(req.user.userId);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    return this.ordersService.findOne(id, req.user.userId);
  }

  @Put(':id/status')
  async updateStatus(
    @Request() req,
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    // TODO: Get vendorId from user's vendor profile
    const vendorId = req.user.userId; // This should be the vendor's ID
    return this.ordersService.updateStatus(id, vendorId, updateOrderStatusDto.status);
  }

  @Get('vendor/my-orders')
  async findVendorOrders(@Request() req) {
    // TODO: Get vendorId from user's vendor profile
    const vendorId = req.user.userId; // This should be the vendor's ID
    return this.ordersService.findVendorOrders(vendorId);
  }
}