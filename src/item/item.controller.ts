import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { GetUser } from '../user/decorators/get-user.decorator';
import { User } from '../user/user.entity';
import { Item } from './item.entity';
import { ItemService } from './item.service';
import { RegistItemDto } from './dto/regist-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemValidationPipe } from './pipes/item-validation.pipe';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  // アイテムの全取得
  @Get()
  getItems(@GetUser() user: User): Promise<Item[]> {
    return this.itemService.getItems();
  }

  // アイテムの個別取得
  @Get('/:itemId')
  getItemById(
    @Param('itemId', ParseIntPipe) itemId: number,
    @GetUser() user: User,
  ): Promise<Item> {
    return this.itemService.getItemById();
  }

  // アイテムの登録
  @Post()
  registItem(
    @Body(ItemValidationPipe) registItemDto: RegistItemDto,
    @GetUser() user: User,
  ): Promise<Item> {
    return this.itemService.registItem();
  }

  // アイテムの更新
  @Patch('/:itemId')
  updateItem(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body(ItemValidationPipe) updateItemDto: UpdateItemDto,
    @GetUser() user: User,
  ): Promise<Item> {
    return this.itemService.updateItem();
  }

  // アイテムの削除
  @Delete('/:itemId')
  deleteItem(
    @Param('itemId', ParseIntPipe) itemId: number,
    @GetUser() user: User,
  ): Promise<{ itemId: number; itemName: string }> {
    return this.itemService.deleteItem();
  }
}
