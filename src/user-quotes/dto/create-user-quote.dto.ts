/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserQuoteDto {
  @IsString()
  @ApiProperty()
  topicId: string;

  @IsString()
  @MinLength(20)
  @MaxLength(2000)
  @ApiProperty()
  quote: string;

}
