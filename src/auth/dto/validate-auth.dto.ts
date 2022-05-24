import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';

export class ValidateUserPropertiesDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber: string;
}
