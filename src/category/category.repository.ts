import { InternalServerErrorException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Category } from './category.entity';
import { RegistCategoryDto } from './dto/regist-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  // IDによるカテゴリーの検索
  async getCategoryById(categoryId: number): Promise<Category> {
    const query = this.findWithInnerJoin();

    try {
      return await query
        .where('category.categoryId = :categoryId', { categoryId })
        .getOne();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // カテゴリーの登録
  async registCategory(
    registCategoryDto: RegistCategoryDto,
    user: User,
  ): Promise<Category> {
    const { categoryName, isIncome } = registCategoryDto;
    const { userId, userName, email } = user;

    const category = this.create();
    category.categoryName = categoryName;
    category.isIncome = isIncome;
    category.author = {
      userId,
      userName,
      email,
    };

    try {
      return await category.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // カテゴリーの更新
  async updateCategory(
    category: Category,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const { categoryName, isIncome } = updateCategoryDto;

    category.categoryName = categoryName;
    category.isIncome = isIncome;

    try {
      return await category.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // DB結合を行ってからselectするQuery発行
  findWithInnerJoin(): SelectQueryBuilder<Category> {
    return this.createQueryBuilder('category')
      .select(['category', 'user.userId', 'user.userName', 'user.email'])
      .innerJoin('category.author', 'user');
  }
}
