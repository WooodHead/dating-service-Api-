/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class QueryTopicDto {
  @IsNumberString()
  @IsOptional()
  @ApiProperty()
  offset: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty()
  limit: number;
}
