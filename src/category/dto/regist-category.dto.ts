import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class RegistCategoryDto {
  @IsString()
  @IsNotEmpty()
  categoryName: string;

  @IsBoolean()
  @IsNotEmpty()
  isIncome: boolean;
}
