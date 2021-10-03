import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class RegisterValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // Bodyに含まれているpaymentDateの値をDate型に変更
    if (value.paymentDate) {
      value.paymentDate = new Date(value.paymentDate);
    }

    // Bodyに含まれているpaymentAmountの値をnumber型に変更
    if (value.paymentAmount) {
      value.paymentAmount = parseInt(value.paymentAmount);
    }

    // Bodyに含まれているdepletionDateの値をDate型に変更
    if (value.depletionDate) {
      value.depletionDate = new Date(value.depletionDate);
    }

    // Bodyに含まれているitemIdの値をnumber型に変更
    if (value.itemId) {
      value.itemId = parseInt(value.itemId);
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
