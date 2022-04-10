import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { Repository } from 'typeorm';
import { Address } from '../entities/Address';
import { Company } from '../entities/Company';
import { Question } from '../entities/Question';
import { QuestionAnswer } from '../entities/QuestionAnswer';
import { User } from '../entities/User';
import { CompanyDetailResponseDto } from './dto/company-detail-response.dto';
import { CompanyListResponseDto } from './dto/company-list-response.dto';
import { CompanyLocationListResponseDto } from './dto/company-location-list-response.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(QuestionAnswer)
    private readonly questionAnswerRepository: Repository<QuestionAnswer>,
  ) {}

  async getCompanyList(
    name: string | undefined,
  ): Promise<CompanyListResponseDto[]> {
    let companyList = null;
    let companyListResponse: CompanyListResponseDto[] = [];

    if (name === undefined || name === '') {
      companyList = await this.companyRepository.find({
        order: { id: 'DESC' },
      });
    } else {
      companyList = await this.companyRepository.find({
        where: {
          name,
        },
        order: {
          id: 'DESC',
        },
      });
    }

    if (companyList.length === 0) {
      return [];
    }

    companyListResponse = await Promise.all(
      companyList.map(async (company: Company) => {
        const location = await this.addressRepository.findOne({
          where: {
            id: company.addressId,
          },
        });

        const questionCnt = await this.questionRepository
          .createQueryBuilder('question')
          .where('question.company_id = :id', { id: company.id })
          .getCount();

        return {
          id: company.id,
          name: company.name,
          location: location.location,
          description: company.description,
          level: company.level,
          job: company.job,
          field: company.field,
          questionCnt,
        };
      }),
    );
    return companyListResponse;
  }

  async getCompanyLocationList(): Promise<CompanyLocationListResponseDto[]> {
    const companyList = await this.companyRepository.find({
      order: { id: 'DESC' },
    });
    let companyLocationList: CompanyLocationListResponseDto[] = [];

    companyLocationList = await Promise.all(
      companyList.map(
        async (company: Company): Promise<CompanyLocationListResponseDto> => {
          const address = await this.addressRepository.findOne({
            where: { id: company.addressId },
          });

          return {
            companyId: company.id,
            name: company.name,
            field: company.field,
            level: company.level,
            address: [address.latitude, address.longitude],
          };
        },
      ),
    );

    return companyLocationList;
  }

  async getCompanyDetail(id: number, userId: number) {
    const user = await this.userRepository.findOne({ id: 1 });

    const company = await this.companyRepository
      .createQueryBuilder('company')
      .select(['name', 'description', 'level', 'job', 'field', 'location'])
      .addSelect('company.id', 'id')
      .leftJoin('company.address', 'address')
      .where('company.id=:id', { id: id })
      .getRawOne();

    const question = await this.questionAnswerRepository
      .createQueryBuilder('question_answer')
      .select('question_answer.id', 'answerId')
      .addSelect('question_answer.question_id', 'questionId')
      .addSelect('question_answer.voice_url', 'voiceUrl')
      .addSelect('question_answer.video_url', 'videoUrl')
      .addSelect('question_answer.answer', 'answer')
      .leftJoin('question_answer.question', 'question')
      .addSelect('question.question', 'question')
      .where('question_answer.user_id=:id', { id: userId })
      .getRawMany();

    return { ...company, userName: user.name, question };
  }

  async deleteCompany(id: number, userId: number) {
    const isCompany = await this.companyRepository.findOne({ id: id });

    if (!isCompany) {
      throw new NotFoundException();
    } else if (isCompany.userId === userId && isCompany.id === id) {
      await this.companyRepository.delete({ id: id });
    } else {
      throw new ForbiddenException();
    }
  }
}
