import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entities/Address';
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
  async myInterviewReview(user_id: number) {
    return await this.companyRepository
      .createQueryBuilder('company')
      .select('company.id')
      .addSelect('company.name')
      .addSelect('company.description')
      .addSelect('company.level')
      .addSelect('company.job')
      .addSelect('company.field')
      .leftJoinAndSelect('company.address', 'address')
      .where('company.user_id=:user_id', { user_id: user_id })
      .getMany();
  }

  async myInterview(userId: number) {
    return await this.companyRepository
      .createQueryBuilder('interview')
      .select([
        'interview.id',
        'interview.name',
        'interview.description',
        'interview.level',
        'interview.job',
        'interview.field',
      ])
      .leftJoin('interview.address', 'address')
      .addSelect('address.location')
      .where('interview.user_id=:id', { id: userId })
      .getMany();
  }
}

// {
//   "id" : 1,
//   "name" : "초스",
//   "location" : "대덕어쩌구"
//   "description" : "안녕하세요!~~~~ 개어렵네요 ~~~ 지원하지 마세요",
//   "level" : 3.9,
//   "job" : "프론트엔드 분야",
//   "field" : "마케팅/IT",
//   "questionCnt" : 3,
//   "isProgress" : false || true
// }
