import { Category } from '../category/category.entity';
import { User } from 'src/user/user.entity';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { RegistItemDto } from './dto/regist-item.dto';
import { Item } from './item.entity';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  // itemの全取得
  async getItems(user: User): Promise<Item[]> {
    const { userId } = user;
    const query = this.findWithInnerJoin();

    try {
      return await query.where('user.userId = :userId', { userId }).getMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // itemの登録
  async registItem(
    registItemDto: RegistItemDto,
    category: Category,
  ): Promise<Item> {
    const {
      itemName,
      isExpendables,
      depletionPeriod,
      isFixedCost,
      fixedCost,
    } = registItemDto;

    const item = this.create();
    item.itemName = itemName;
    item.isExpendables = isExpendables;
    item.depletionPeriod = depletionPeriod;
    item.isFixedCost = isFixedCost;
    item.fixedCost = fixedCost;
    item.category = category;

    try {
      return await item.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // DB結合をするQuery発行
  findWithInnerJoin(): SelectQueryBuilder<Item> {
    return this.createQueryBuilder('item')
      .select([
        'item',
        'category.categoryId',
        'category.categoryName',
        'category.isIncome',
        'user.userId',
        'user.userName',
        'user.email',
      ])
      .innerJoin('item.category', 'category')
      .innerJoin('category.author', 'user');
  }
}
