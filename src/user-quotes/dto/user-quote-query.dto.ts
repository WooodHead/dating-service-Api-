/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UserQuotesQueryDto {
 @IsString()
 @ApiProperty()
 quote: string;   
}