import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserBlockDto {
  @IsString()
  @ApiProperty()
  userId: string;
}
