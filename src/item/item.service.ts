import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from '../category/category.repository';
import { User } from '../user/user.entity';
import { RegistItemDto } from './dto/regist-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './item.entity';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemRepository)
    private itemRepository: ItemRepository,
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  // アイテムの全取得
  async getItems(user: User): Promise<Item[]> {
    return this.itemRepository.getItems(user);
  }

  // アイテムの個別取得
  async getItemById(itemId: number, user: User): Promise<Item> {
    const { userId } = user;
    const item = await this.itemRepository.getItemById(itemId);

    if (!item || item.category.author.userId !== userId) {
      throw new NotFoundException(`Item with ID "${itemId}" is NOT found`);
    }

    return item;
  }

  // アイテムの登録
  async registItem(registItemDto: RegistItemDto, user: User): Promise<Item> {
    const { categoryId } = registItemDto;
    const category = await this.categoryRepository.getCategoryById(categoryId);

    if (!category || category.author.userId !== user.userId) {
      throw new NotFoundException(
        `Category with ID "${categoryId}" is NOT found`,
      );
    }

    return this.itemRepository.registItem(registItemDto, category);
  }

  // アイテムの更新
  async updateItem(
    itemId: number,
    updateItemDto: UpdateItemDto,
    user: User,
  ): Promise<Item> {
    const { userId } = user;
    const item = await this.itemRepository.getItemById(itemId);

    if (!item || item.category.author.userId !== userId) {
      if (!item || item.category.author.userId !== userId) {
        throw new NotFoundException(`Item with ID "${itemId}" is NOT found`);
      }
    }
    return this.itemRepository.updateItem(item, updateItemDto);
  }

  // アイテムの削除
  async deleteItem(
    itemId: number,
    user: User,
  ): Promise<{ itemId: number; itemName: string }> {
    return null;
  }
}
