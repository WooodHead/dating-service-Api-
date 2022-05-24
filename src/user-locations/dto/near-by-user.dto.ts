import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class NearByUserDto {
  @IsNumberString()
  @ApiProperty()
  lat: number;

  @IsNumberString()
  @ApiProperty()
  long: number;
}
