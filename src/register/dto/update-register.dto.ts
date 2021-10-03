import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateRegisterDto {
  @IsDate()
  @IsOptional()
  paymentDate: Date;

  @IsInt()
  @IsOptional()
  paymentAmount: number;

  @IsDate()
  @IsOptional()
  depletionDate: Date;

  @IsString()
  @IsOptional()
  memo: string;
}
