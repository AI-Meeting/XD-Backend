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
    const companyData = await this.companyRepository.findOne({
      userId: userId,
    });
    const questionCnt = await this.questionRepository.find({
      companyId: companyData.id,
    });

    console.log(questionCnt);

    return await this.companyRepository
      .createQueryBuilder('interview')
      .select(['name', 'description', 'level', 'job', 'field', 'location'])
      .addSelect('interview.id', 'id')
      .leftJoin('interview.address', 'address')
      .leftJoinAndSelect('interview.question', 'question')
      .where('interview.user_id=:id', { id: userId })
      //.where('question.question_id=:id', { id: companyData.id })
      .getRawMany();
  }
}
