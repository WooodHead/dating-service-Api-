import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostPrivacyLevel } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  @ApiProperty()
  content: string;

  @IsEnum(PostPrivacyLevel)
  @ApiProperty()
  privacyLevel: PostPrivacyLevel;

  @IsArray()
  @ApiProperty()
  attachmentIds?: string[];

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  isPublished: boolean;
}
