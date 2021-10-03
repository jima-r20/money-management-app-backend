import { IsDate, IsInt, IsNotEmpty } from 'class-validator';

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
}
