import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';
import { RegistCategoryDto } from './dto/regist-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  // IDによるカテゴリーの検索
  async getCategoryById(categoryId: number): Promise<Category> {
    return this.findOne(categoryId);
  }

  // カテゴリーの登録
  async registCategory(
    registCategoryDto: RegistCategoryDto,
  ): Promise<Category> {
    const { categoryName, isIncome } = registCategoryDto;

    const category = this.create();
    category.categoryName = categoryName;
    category.isIncome = isIncome;

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
}
