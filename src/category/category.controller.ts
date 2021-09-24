import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { RegistCategoryDto } from './dto/regist-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryValidationPipe } from './pipes/category-validation.pipe';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  // カテゴリーの取得
  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }

  // カテゴリーの登録
  @Post()
  registCategory(
    @Body(CategoryValidationPipe) registCategoryDto: RegistCategoryDto,
  ): Promise<Category> {
    return this.categoryService.registCategory(registCategoryDto);
  }

  // カテゴリーの更新
  @Patch('/:categoryId')
  updateCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body(CategoryValidationPipe) updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(categoryId, updateCategoryDto);
  }

  // カテゴリーの削除
  @Delete('/:categoryId')
  deleteCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<{ categoryId: number; categoryName: string }> {
    return this.categoryService.deleteCategory(categoryId);
  }
}
