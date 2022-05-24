import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateUserNotificationDto {
  @IsBoolean()
  @ApiProperty()
  isRead: boolean;

  // @IsNumber()
  id: string;

  // @IsString()
  userId: string;
}
