import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class RegistItemDto {
  @IsString()
  @IsNotEmpty()
  itemName: string;

  @IsBoolean()
  @IsNotEmpty()
  isExpendables: boolean;

  @IsInt()
  @IsOptional()
  depletionPeriod: number;

  @IsBoolean()
  @IsNotEmpty()
  isFixedCost: boolean;

  @IsInt()
  @IsOptional()
  fixedCost: number;

  @IsInt()
  @IsNotEmpty()
  categoryId: number;
}
