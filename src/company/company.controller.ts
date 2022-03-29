import { Controller, Get, Query } from '@nestjs/common';
import { Company } from '../entities/Company';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companySerivce: CompanyService) {}

  @Get('')
  async getCompanyList(
    @Query('name') name: string | undefined,
  ): Promise<Company[]> {
    return await this.companySerivce.getCompanyList(name);
  }
}
