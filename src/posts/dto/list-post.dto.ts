import { IsOptional, IsString } from 'class-validator';

export class ListPostsDto {
  @IsString()
  @IsOptional()
  userId?: string;
}
