import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { LoginRequestDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: SignUpDto) {
    const saltOrRounds = 10;

    if (await this.userRepository.findOne({ email: user.email })) {
      throw new ConflictException('Email already exist');
    }

    const password = await bcrypt.hash(user.password, saltOrRounds);

    await this.userRepository.save({
      ...user,
      password,
    });
  }

  async login(loginRequest: LoginRequestDto) {
    const { email, password } = loginRequest;

    console.log('asd');
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      console.log('asasadd');
      throw new NotFoundException('잘못된 인증 정보');
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new BadRequestException('잘못된 인증 정보');
    }

    const payload = { sub: user.id };

    return {
      token: this.jwtService.sign(payload),
      userId: user.id,
    };
  }
}
