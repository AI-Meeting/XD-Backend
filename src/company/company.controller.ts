import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompanyService } from './company.service';
import { CompanyDetailResponseDto } from './dto/company-detail-response.dto';
import { CompanyListResponseDto } from './dto/company-list-response.dto';
import { CompanyLocationListResponseDto } from './dto/company-location-list-response.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companySerivce: CompanyService) {}

  @Get('')
  async getCompanyList(
    @Query('name') name: string | undefined,
  ): Promise<CompanyListResponseDto[]> {
    return await this.companySerivce.getCompanyList(name);
  }

  @Get('list')
  async getCompanyLocationList(): Promise<CompanyLocationListResponseDto[]> {
    return await this.companySerivce.getCompanyLocationList();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getCompanyDetail(
    @Request() req: any,
    @Param('id') id: number,
  ): Promise<CompanyDetailResponseDto> {
    return await this.companySerivce.getCompanyDetail(id, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('')
  async deleteComapny(@Body() body: { id: number }, @Request() req: any) {
    return await this.companySerivce.deleteCompany(body.id, req.user.userId);
  }
}
