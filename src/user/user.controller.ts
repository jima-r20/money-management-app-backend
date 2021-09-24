import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { UserInformation } from './interfaces/user-information.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //  ユーザ登録
  @Post('/signup')
  signUp(
    @Body(ValidationPipe) signUpCredentialsDto: SignUpCredentialsDto,
  ): Promise<UserInformation> {
    return this.userService.signUp(signUpCredentialsDto);
  }

  // ログイン
  @Post('signin')
  signIn(
    @Body(ValidationPipe) signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(signInCredentialsDto);
  }
}
