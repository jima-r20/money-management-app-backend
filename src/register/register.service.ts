import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from '../category/category.repository';
import { ItemRepository } from '../item/item.repository';
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

  // 登録情報の更新

  // 登録情報の削除
}
