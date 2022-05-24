import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class RemoveUserNotificationDto {
  @IsNumber()
  @ApiProperty()
  id: string;

  userId: string;
}
