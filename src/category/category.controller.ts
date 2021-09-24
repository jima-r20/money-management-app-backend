import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../user/decorators/get-user.decorator';
import { User } from '../user/user.entity';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { RegistCategoryDto } from './dto/regist-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryValidationPipe } from './pipes/category-validation.pipe';

@Controller('category')
@UseGuards(AuthGuard())
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  // カテゴリーの取得
  @Get()
  getCategories(@GetUser() user: User): Promise<Category[]> {
    return this.categoryService.getCategories(user);
  }

  // カテゴリーの登録
  @Post()
  registCategory(
    @Body(CategoryValidationPipe) registCategoryDto: RegistCategoryDto,
    @GetUser() user: User,
  ): Promise<Category> {
    return this.categoryService.registCategory(registCategoryDto, user);
  }

  // カテゴリーの更新
  @Patch('/:categoryId')
  updateCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body(CategoryValidationPipe) updateCategoryDto: UpdateCategoryDto,
    @GetUser() user: User,
  ): Promise<Category> {
    return this.categoryService.updateCategory(
      categoryId,
      updateCategoryDto,
      user,
    );
  }

  // カテゴリーの削除
  @Delete('/:categoryId')
  deleteCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @GetUser() user: User,
  ): Promise<{ categoryId: number; categoryName: string }> {
    return this.categoryService.deleteCategory(categoryId, user);
  }
}
