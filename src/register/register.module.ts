import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from '../category/category.repository';
import { ItemRepository } from '../item/item.repository';
import { UserModule } from '../user/user.module';
import { RegisterController } from './register.controller';
import { RegisterRepository } from './register.repository';
import { RegisterService } from './register.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RegisterRepository,
      ItemRepository,
      CategoryRepository,
    ]),
    UserModule,
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
