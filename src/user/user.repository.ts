import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { SignUpResponse } from './interfaces/signup-response.interface';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // ユーザ登録
  async signUp(
    signUpCredentialsDto: SignUpCredentialsDto,
  ): Promise<SignUpResponse> {
    const { userName, email, password } = signUpCredentialsDto;

    const user = this.create();
    user.userName = userName;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      return { userName, email };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('This email already registerd');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // PWハッシュ化
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  // ログインユーザ確認　(EmailとPWが正しいか)
  async validateUserPassword(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<string | null> {
    const { email, password } = signInCredentialsDto;
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user.email;
    } else {
      return null;
    }
  }
}
