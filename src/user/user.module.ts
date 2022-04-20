import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../entities/Company';
import { Question } from '../entities/Question';
import { User } from '../entities/User';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Company, Question])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
