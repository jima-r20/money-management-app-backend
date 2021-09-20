import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { User } from './user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // ユーザ登録
  async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<any> {
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
        throw new InternalServerErrorException(error);
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
