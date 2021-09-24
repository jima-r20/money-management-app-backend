import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { RegistCategoryDto } from './dto/regist-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  // カテゴリーの全取得
  async getCategories(user: User): Promise<Category[]> {
    return this.categoryRepository.getCategories(user);
  }

  // カテゴリー登録
  async registCategory(
    registCategoryDto: RegistCategoryDto,
    user: User,
  ): Promise<Category> {
    return this.categoryRepository.registCategory(registCategoryDto, user);
  }

  // カテゴリー更新
  async updateCategory(
    categoryId: number,
    updateCategoryDto: UpdateCategoryDto,
    user: User,
  ): Promise<Category> {
    const category = await this.categoryRepository.getCategoryById(categoryId);

    if (!category || user.userId !== category.author.userId) {
      throw new NotFoundException(
        `Category with ID "${categoryId}" is NOT found`,
      );
    }

    return this.categoryRepository.updateCategory(category, updateCategoryDto);
  }

  // カテゴリー削除
  async deleteCategory(
    categoryId: number,
    user: User,
  ): Promise<{ categoryId: number; categoryName: string }> {
    const category = await this.categoryRepository.getCategoryById(categoryId);

    if (!category || user.userId !== category.author.userId) {
      throw new NotFoundException(
        `Category with ID "${categoryId}" is NOT found`,
      );
    }

    try {
      await this.categoryRepository.delete({ categoryId });
      return { categoryId, categoryName: category.categoryName };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
