import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/Company';
import { Question } from '../entities/Question';
import { User } from '../entities/User';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
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
  async myInterviewReview(userId: number) {
    const interviewReview = await this.companyRepository
      .createQueryBuilder('company')
      .select(['name', 'description', 'level', 'job', 'field', 'location'])
      .addSelect('company.id', 'id')
      .addSelect('COUNT(questions.company_id) AS questionCnt')
      .leftJoin('company.address', 'address')
      .leftJoin('company.questions', 'questions')
      .where('company.user_id=:id', { id: userId })
      .groupBy('questions.company_id')
      .getRawMany();

    const isProgress = 'asd';

    return { ...interviewReview, isProgress };
  }

  // 내가 진행중인 모의 면접
  async myInterview(userId: number) {
    return await this.companyRepository
      .createQueryBuilder('interview')
      .select(['name', 'description', 'level', 'job', 'field', 'location'])
      .addSelect('interview.id', 'id')
      .addSelect('COUNT(questions.company_id) AS questionCnt')
      .leftJoin('interview.address', 'address')
      .leftJoin('interview.questions', 'questions')
      .where('interview.user_id=:id', { id: userId })
      .groupBy('questions.company_id')
      .getRawMany();
  }
}
