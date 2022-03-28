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
    return await this.userRepository
      .createQueryBuilder('user')
      .select('user.id', 'id')
      .addSelect('user.name', 'name')
      .addSelect('user.school', 'school')
      .where('user.id=:id', { id: 1 })
      .getRawOne();
  }
}
