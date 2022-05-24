import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileViewDto {
  @IsString()
  @ApiProperty()
  userId: string;
}
