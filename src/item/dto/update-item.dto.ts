import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateItemDto {
  @IsString()
  @IsOptional()
  itemName: string;

  @IsBoolean()
  @IsOptional()
  isExpendables: boolean;

  @IsInt()
  @IsOptional()
  depletionPeriod: number;

  @IsBoolean()
  @IsOptional()
  isFixedCost: boolean;

  @IsInt()
  @IsOptional()
  fixedCost: number;
}
