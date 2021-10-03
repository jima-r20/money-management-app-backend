import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../user/decorators/get-user.decorator';
import { User } from '../user/user.entity';
import { Register } from './register.entity';
import { RegisterService } from './register.service';
import { RegistRegisterDto } from './dto/regist-register.dto';
import { RegisterValidationPipe } from './pipes/registr-validation.pipe';

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

  // 登録情報の削除
}
