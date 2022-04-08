import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '../entities/Address';
import { Company } from '../entities/Company';
import { Question } from '../entities/Question';
import { QuestionAnswer } from '../entities/QuestionAnswer';
import { User } from '../entities/User';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company,
      Address,
      Question,
      User,
      QuestionAnswer,
    ]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
