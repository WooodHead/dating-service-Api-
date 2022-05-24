import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UserLocationHistoryDto {
  @IsNumber()
  @ApiProperty()
  limit: number;

  @IsNumber()
  @ApiProperty()
  offset: number;
}
