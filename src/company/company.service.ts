import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/Company';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async getCompanyList(name: string | undefined): Promise<Company[]> {
    let company = null;

    if (name === undefined || name === '') {
      company = await this.companyRepository.find({
        order: { id: 'DESC' },
      });
    } else {
      company = await this.companyRepository.find({
        where: {
          name,
        },
        order: {
          id: 'DESC',
        },
      });
    }

    if (!company) {
      throw new NotFoundException('값이 존재하지 않습니다.');
    }

    return company;
  }
}
