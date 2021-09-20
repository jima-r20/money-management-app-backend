import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) signUpCredentialsDto: SignUpCredentialsDto,
  ): Promise<any> {
    return this.userService.signUp(signUpCredentialsDto);
  }
}
