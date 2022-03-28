import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/Company';
import { User } from '../entities/User';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async userInfo() {
    return await this.userRepository
      .createQueryBuilder('user')
      .select('name', 'name')
      .addSelect('school', 'school')
      .addSelect('email', 'email')
      .where('id=:id', { id: 1 })
      .getRawOne();
  }

  // 내가 등록한 모의 면접 후기
  async myInterviewReview() {
    return await this.companyRepository
      .createQueryBuilder('company')
      .select('company.id')
      .addSelect('company.name')
      .addSelect('company.description')
      .addSelect('company.level')
      .addSelect('company.job')
      .addSelect('company.field')
      .leftJoinAndSelect('company.address', 'address')
      .getMany();
  }

  async myInterview() {
    return await this.companyRepository
      .createQueryBuilder('interview')
      .select('interview.id')
      .addSelect('');
  }
}
