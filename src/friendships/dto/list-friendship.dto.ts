import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class ListFriendshipDto {
  @IsNumberString()
  @ApiProperty()
  limit: string;

  @IsNumberString()
  @ApiProperty()
  offset: string;
}
