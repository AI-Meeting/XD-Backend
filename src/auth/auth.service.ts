import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { LoginRequestDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

    
  }
}
