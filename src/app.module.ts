import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ItemModule } from './item/item.module';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, CategoryModule, ItemModule, RegisterModule],
})
export class AppModule {}
