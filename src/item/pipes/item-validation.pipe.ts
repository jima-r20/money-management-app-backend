import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ItemValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // Bodyに含まれているisExpendablesの値をboolean型に変更
    if (value.isExpendables) {
      value.isExpendables = value.isExpendables === 'true';
    }

    // Bodyに含まれているdepletionPeriodの値をnumber型に変更
    if (value.depletionPeriod) {
      value.depletionPeriod = parseInt(value.depletionPeriod);
    }

    // Bodyに含まれているisFixedCostの値をboolean型に変更
    if (value.isFixedCost) {
      value.isFixedCost = value.isFixedCost === 'true';
    }

    // Bodyに含まれているfixedCostの値をnumber型に変更
    if (value.fixedCost) {
      value.fixedCost = parseInt(value.fixedCost);
    }

    // Bodyに含まれているcategoryIdの値をnumber型に変更
    if (value.categoryId) {
      value.categoryId = parseInt(value.categoryId);
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      // throw new BadRequestException('Validation failed');
      throw new BadRequestException(errors);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
