import { EntityRepository, Repository } from 'typeorm';
import { Item } from '../item/item.entity';
import { Register } from './register.entity';
import { RegistRegisterDto } from './dto/regist-register.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Register)
export class RegisterRepository extends Repository<Register> {
  // 新規登録
  async registRegister(
    registRegisterDto: RegistRegisterDto,
    item: Item,
  ): Promise<Register> {
    const { paymentDate, paymentAmount } = registRegisterDto;

    const register = this.create();
    register.paymentDate = paymentDate;
    register.paymentAmount = paymentAmount;
    register.item = item;

    try {
      return await register.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
