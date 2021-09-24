import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  // カテゴリー取得
  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  // カテゴリー登録
  async registCategory(
    registCategoryDto: RegistCategoryDto,
  ): Promise<Category> {
    return this.categoryRepository.registCategory(registCategoryDto);
  }

  // カテゴリー更新
  async updateCategory(
    categoryId: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.getCategoryById(categoryId);

    if (!category || categoryId !== category.categoryId) {
      throw new NotFoundException(
        `Category with ID "${categoryId}" is NOT found`,
      );
    }

    return this.categoryRepository.updateCategory(category, updateCategoryDto);
  }

  // カテゴリー削除
  async deleteCategory(
    categoryId: number,
  ): Promise<{ categoryId: number; categoryName: string }> {
    const category = await this.categoryRepository.getCategoryById(categoryId);

    if (!category || categoryId !== category.categoryId) {
      throw new NotFoundException(
        `Category with ID "${categoryId}" is NOT found`,
      );
    }

    try {
      const result = await this.categoryRepository.delete({ categoryId });
      return { categoryId, categoryName: category.categoryName };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
