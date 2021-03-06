import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  categoryName: string;

  @IsBoolean()
  @IsOptional()
  isIncome: boolean;
}
