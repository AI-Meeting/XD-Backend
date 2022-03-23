import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async signUp(user: SignUpDto) {
    console.log('adsds');

    console.log(
      await this.userRepository.findOne({ where: { email: user.email } }),
    );

    if (await this.userRepository.findOne({ where: { email: user.email } })) {
      throw new ConflictException('Email already exist');
    } else if (
      await this.userRepository.findOne({ where: { name: user.name } })
    ) {
      throw new ConflictException('Name already exist');
    }
    const password = await bcrypt.hash(user.password, 60);
    console.log(password);
  }
}
