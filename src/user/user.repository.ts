import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // ユーザ登録
  async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<any> {
    const { userName, email, password } = signUpCredentialsDto;

    const salt = await bcrypt.genSalt();

    return {
      userName,
      email,
      password: await this.hashPassword(password, salt),
    };
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
