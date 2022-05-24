import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class ListProfileViewDto {
  @IsNumberString()
  @ApiProperty()
  limit: number;

  @IsNumberString()
  @ApiProperty()
  offset: number;
}
