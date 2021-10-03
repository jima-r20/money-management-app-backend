import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { CategoryRepository } from '../category/category.repository';
import { ItemRepository } from '../item/item.repository';
import { Register } from './register.entity';
import { RegistRegisterDto } from './dto/regist-register.dto';
import { RegisterRepository } from './register.repository';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(RegisterRepository)
    private registerRepository: RegisterRepository,
    @InjectRepository(ItemRepository)
    private itemRepository: ItemRepository,
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  // 登録情報の全取得

  // 登録情報の個別取得

  // 月単位取得の取得

  // カテゴリ単位の登録情報の取得

  // アイテム単位の登録情報の取得

  // 新規登録
  async registRegister(
    registRegisterDto: RegistRegisterDto,
    user: User,
  ): Promise<Register> {
    const { itemId } = registRegisterDto;
    const { userId } = user;
    const item = await this.itemRepository.getItemById(itemId);

    if (!item || item.category.author.userId !== userId) {
      throw new NotFoundException(`Item with ID "${itemId}" is NOT found`);
    }

    return this.registerRepository.registRegister(registRegisterDto, item);
  }

  // 登録情報の更新

  // 登録情報の削除
}