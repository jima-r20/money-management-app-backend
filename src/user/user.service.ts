import { Injectable } from '@nestjs/common';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';

@Injectable()
export class UserService {
  async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<any> {
    return 'OK';
  }
}
