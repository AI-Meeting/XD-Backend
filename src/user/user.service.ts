import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/Company';
import { Interview } from '../entities/Interview';
import { Question } from '../entities/Question';
import { User } from '../entities/User';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(Interview)
    private readonly interviewReposotory: Repository<Interview>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async userInfo(userId: number) {
    return await this.userRepository
      .createQueryBuilder('user')
      .select('name', 'name')
      .addSelect('school', 'school')
      .addSelect('email', 'email')
      .where('id=:userId', { userId })
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

    return interviewReview;
  }

  // 내가 진행중인 모의 면접
  async myInterview(userId: number) {
    return await this.interviewReposotory
      .createQueryBuilder('interview')
      .select(['name', 'description', 'level', 'job', 'field', 'location'])
      .addSelect('company.id', 'id')
      .addSelect('COUNT(questions.company_id) AS questionCnt')
      .leftJoin('interview.company', 'company')
      .leftJoin('company.address', 'address')
      .leftJoin('company.questions', 'questions')
      .where('interview.user_id=:id', { id: userId })
      .groupBy('questions.company_id')
      .getRawMany();
  }
}
