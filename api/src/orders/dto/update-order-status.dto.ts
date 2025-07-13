import { IsString, IsIn } from 'class-validator';

export class UpdateOrderStatusDto {
  @IsString()
  @IsIn(['pending', 'shipped', 'delivered', 'cancelled'])
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
}