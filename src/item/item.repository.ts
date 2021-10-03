import { Category } from '../category/category.entity';
import { User } from 'src/user/user.entity';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { RegistItemDto } from './dto/regist-item.dto';
import { Item } from './item.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateItemDto } from './dto/update-item.dto';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  // アイテムの全取得
  async getItems(user: User): Promise<Item[]> {
    const { userId } = user;
    const query = this.findWithInnerJoin();

    try {
      return await query.where('user.userId = :userId', { userId }).getMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // アイテムの個別取得
  async getItemById(itemId: number): Promise<Item> {
    const query = this.findWithInnerJoin();

    try {
      return query.where('item.itemId = :itemId', { itemId }).getOne();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // アイテムの登録
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
    item.depletionPeriod = item.isExpendables ? depletionPeriod : null; // isExpendablesがfalseなら不要なのでnull
    item.isFixedCost = isFixedCost;
    item.fixedCost = item.isFixedCost ? fixedCost : null; // isFixedCostがfalseなら不要なのでnull
    item.category = category;

    try {
      return await item.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('This item already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // アイテムの更新
  async updateItem(item: Item, updateItemDto: UpdateItemDto): Promise<Item> {
    const {
      itemName,
      isExpendables,
      depletionPeriod,
      isFixedCost,
      fixedCost,
    } = updateItemDto;

    itemName ? (item.itemName = itemName) : null;
    item.isExpendables = isExpendables;
    item.depletionPeriod = item.isExpendables ? depletionPeriod : null; // isExpendablesがfalseなら不要なのでnull
    item.isFixedCost = isFixedCost;
    item.fixedCost = item.isFixedCost ? fixedCost : null; // isFixedCostがfalseなら不要なのでnull

    try {
      return await item.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // DB結合をするQuery発行
  private findWithInnerJoin(): SelectQueryBuilder<Item> {
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
