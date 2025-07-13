import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async getProfile(@Request() req) {
    const user = await this.usersService.findById(req.user.userId);
    const { passwordHash, ...result } = user;
    return {
      status: 'success',
      statusCode: 200,
      message: 'Profile retrieved successfully',
      data: result,
    };
  }

  @Put('me')
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(req.user.userId, updateUserDto);
    const { passwordHash, ...result } = user;
    return {
      status: 'success',
      statusCode: 200,
      message: 'Profile updated successfully',
      data: result,
    };
  }
}