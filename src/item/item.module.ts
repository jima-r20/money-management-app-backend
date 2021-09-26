import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from '../category/category.repository';
import { UserModule } from '../user/user.module';
import { ItemController } from './item.controller';
import { ItemRepository } from './item.repository';
import { ItemService } from './item.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemRepository, CategoryRepository]),
    UserModule,
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
