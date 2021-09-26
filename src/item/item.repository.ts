import { Category } from '../category/category.entity';
import { User } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { RegistItemDto } from './dto/regist-item.dto';
import { Item } from './item.entity';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
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
}
