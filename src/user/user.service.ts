import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserRepository } from './user.repository';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { SignUpResponse } from './interfaces/signup-response.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  // ユーザ登録
  async signUp(
    signUpCredentialsDto: SignUpCredentialsDto,
  ): Promise<SignUpResponse> {
    return this.userRepository.signUp(signUpCredentialsDto);
  }

  // ログイン
  async signIn(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const email = await this.userRepository.validateUserPassword(
      signInCredentialsDto,
    );

    if (!email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // アクセストークンの作成
    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
