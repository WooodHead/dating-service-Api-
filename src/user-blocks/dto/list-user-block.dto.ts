import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, MaxLength } from 'class-validator';

export class ListUserBlockDto {
  @IsNumberString()
  @ApiProperty()
  @MaxLength(2)
  limit: string;

  @IsNumberString()
  @ApiProperty()
  offset: string;
}
