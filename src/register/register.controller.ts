import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterService } from './register.service';

@Controller('register')
@UseGuards(AuthGuard())
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  // 登録情報の全取得

  // 登録情報の個別取得

  // 月単位取得の取得

  // カテゴリ単位の登録情報の取得

  // アイテム単位の登録情報の取得

  // 新規登録

  // 登録情報の更新

  // 登録情報の削除
}
