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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../user/decorators/get-user.decorator';
import { User } from '../user/user.entity';
import { Register } from './register.entity';
import { RegisterService } from './register.service';
import { RegistRegisterDto } from './dto/regist-register.dto';
import { RegisterValidationPipe } from './pipes/register-validation.pipe';
import { UpdateRegisterDto } from './dto/update-register.dto';

@Controller('register')
@UseGuards(AuthGuard())
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  // 登録情報の全取得
  @Get()
  getRegisters(@GetUser() user: User): Promise<Register[]> {
    return this.registerService.getRegisters(user);
  }

  // 登録情報の個別取得
  @Get('/:registrationId')
  getRegisterById(
    @Param('registrationId', ParseIntPipe) registrationId: number,
    @GetUser() user: User,
  ): Promise<Register> {
    return this.registerService.getRegisterById(registrationId, user);
  }

  // 月単位取得の取得

  // カテゴリ単位の登録情報の取得

  // アイテム単位の登録情報の取得

  // 新規登録
  @Post()
  registRegister(
    @Body(RegisterValidationPipe) registRegisterDto: RegistRegisterDto,
    @GetUser() user: User,
  ): Promise<Register> {
    return this.registerService.registRegister(registRegisterDto, user);
  }

  // 登録情報の更新
  @Patch('/:registrationId')
  updateRegister(
    @Param('registrationId', ParseIntPipe) registrationId: number,
    @Body(RegisterValidationPipe) updateRegisterDto: UpdateRegisterDto,
    @GetUser() user: User,
  ): Promise<Register> {
    return this.registerService.updateRegister(
      registrationId,
      updateRegisterDto,
      user,
    );
  }

  // 登録情報の削除
  @Delete('/:registrationId')
  deleteRegister(
    @Param('registrationId', ParseIntPipe) registrationId: number,
    @GetUser() user: User,
  ): Promise<{
    registrationId: number;
    paymentDate: Date;
    paymentAmount: number;
  }> {
    return this.registerService.deleteRegister(registrationId, user);
  }
}
