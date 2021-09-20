import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) // private jwtService: JwtService,
  {}

  async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<any> {
    return this.userRepository.signUp(signUpCredentialsDto);
  }
}
