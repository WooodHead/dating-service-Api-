import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class ListUserProfileLikeDto {
  @IsNumberString()
  @ApiProperty()
  limit: number;

  @IsNumberString()
  @ApiProperty()
  offset: number;
}
