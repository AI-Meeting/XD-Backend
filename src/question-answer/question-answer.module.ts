import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionAnswer } from '../entities/QuestionAnswer';
import { QuestionAnswerController } from './question-answer.controller';
import { QuestionAnswerService } from './question-answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionAnswer])],
  controllers: [QuestionAnswerController],
  providers: [QuestionAnswerService],
})
export class QuestionAnswerModule {}
