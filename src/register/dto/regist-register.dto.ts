import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class RegistRegisterDto {
  @IsDate()
  @IsNotEmpty()
  paymentDate: Date;

  @IsInt()
  @IsNotEmpty()
  paymentAmount: number;

  @IsInt()
  @IsNotEmpty()
  itemId: number;

  @IsString()
  @IsOptional()
  memo: string;
}
