import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interview } from '../entities/Interview';
import { QuestionAnswer } from '../entities/QuestionAnswer';
import { QuestionAnswerController } from './question-answer.controller';
import { QuestionAnswerService } from './question-answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionAnswer, Interview])],
  controllers: [QuestionAnswerController],
  providers: [QuestionAnswerService],
})
export class QuestionAnswerModule {}
