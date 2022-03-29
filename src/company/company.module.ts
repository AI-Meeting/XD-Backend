import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '../entities/Address';
import { Company } from '../entities/Company';
import { Question } from '../entities/Question';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Address, Question])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
