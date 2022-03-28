import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async userInfo() {
    return this.userRepository
      .createQueryBuilder('user')
      .select('id', 'id')
      .addSelect('name', 'name')
      .addSelect('school', 'school')
      .where('id=:id', { id: 1 });
  }
}
