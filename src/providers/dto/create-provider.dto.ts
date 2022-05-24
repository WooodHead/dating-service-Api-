import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  order: number;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
