import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateUserLocationDto {
  updatedAt: Date;
  @IsNumber()
  @ApiProperty()
  long: number;

  @IsNumber()
  @ApiProperty()
  lat: number;
}
