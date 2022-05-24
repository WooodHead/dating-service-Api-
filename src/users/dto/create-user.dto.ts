/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AuthProviderType, LocationObjectType, UserQuoteObject, users } from '@prisma/client';
import {
  IsString,
  IsEmail,
  MaxLength,
  MinLength,
  IsDateString,
  IsOptional,
  IsPhoneNumber,
  IsBoolean,
  IsEnum,
  IsUrl,
} from 'class-validator';

export class CreateUserDto implements users {
  id: string;
  password: string;
  isPremium: boolean;
  isActive: boolean;
  isBanned: boolean;
  createdAt: Date;
  updatedAt: Date;
  loc: LocationObjectType;
  quote: UserQuoteObject;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  firstName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  lastName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty()
  gender: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty()
  sexualOrientation: string;

  @IsDateString()
  @ApiProperty()
  birthday: Date;

  @IsString()
  @ApiProperty()
  showMe: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isPrivate: boolean;

  @IsPhoneNumber()
  @ApiPropertyOptional()
  phoneNumber: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  isPhoneVerified: boolean;
}

export class CreateUserWithGoogleDto {
  @IsEnum(AuthProviderType)
  providerId: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsUrl()
  profilePicture: string;

  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}

export class CreateUserWithFacebookDto {
  @IsEnum(AuthProviderType)
  providerId: string;

  @IsString()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsUrl()
  profilePicture: string;

  @IsString()
  accessToken: string;
}
