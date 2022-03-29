import { Controller, Get, Query } from '@nestjs/common';
import { Company } from '../entities/Company';
import { CompanyService } from './company.service';
import { CompanyListResponseDto } from './dto/company-list-response.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companySerivce: CompanyService) {}

  @Get('')
  async getCompanyList(
    @Query('name') name: string | undefined,
  ): Promise<CompanyListResponseDto[]> {
    return await this.companySerivce.getCompanyList(name);
  }
}
