import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { User } from '../user/user.entity';
import { Item } from '../item/item.entity';
import { Register } from './register.entity';
import { RegistRegisterDto } from './dto/regist-register.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Register)
export class RegisterRepository extends Repository<Register> {
  // 登録情報の全取得
  async getRegisters(user: User): Promise<Register[]> {
    const { userId } = user;
    const query = this.findWithInnerJoin();

    try {
      return await query.where('user.userId = :userId', { userId }).getMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // 登録情報の個別取得
  async getRegisterById(registrationId: number): Promise<Register> {
    const query = this.findWithInnerJoin();

    try {
      return query
        .where('register.registrationId = :registrationId', { registrationId })
        .getOne();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

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

  // DB結合をするQuery発行
  private findWithInnerJoin(): SelectQueryBuilder<Register> {
    return this.createQueryBuilder('register')
      .select([
        'register',
        'item',
        'category',
        'user.userId',
        'user.userName',
        'user.email',
      ])
      .innerJoin('register.item', 'item')
      .innerJoin('item.category', 'category')
      .innerJoin('category.author', 'user');
  }
}
