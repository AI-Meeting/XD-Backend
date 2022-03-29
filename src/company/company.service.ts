import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entities/Address';
import { Company } from '../entities/Company';
import { Question } from '../entities/Question';
import { CompanyListResponseDto } from './dto/company-list-response.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
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

    if (!companyList) {
      throw new NotFoundException('값이 존재하지 않습니다.');
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
}
