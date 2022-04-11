import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionAnswer } from '../entities/QuestionAnswer';
import { QuestionAnswerPostDto } from './dto/question-answer-post.dto';

@Injectable()
export class QuestionAnswerService {
  constructor(
    @InjectRepository(QuestionAnswer)
    private readonly questionAnswerRepository: Repository<QuestionAnswer>,
  ) {}

  async postQuestionAnswer(
    userId: number,
    questionId: number,
    body: QuestionAnswerPostDto,
  ) {
    const answer = new QuestionAnswer();
    answer.questionId = questionId;
    answer.answer = body.answer;
    answer.videoUrl = body.videoUrl;
    answer.voiceUrl = body.voiceUrl;
    answer.userId = userId;

    await this.questionAnswerRepository.save(answer);
  }

  async deleteQuestionAanswer(userId: number, answerId: number) {
    const answer = await this.questionAnswerRepository.findOne({
      id: answerId,
    });

    if (!answer) {
      throw new NotFoundException();
    } else if (userId !== answer.userId) {
      throw new UnauthorizedException();
    }

    await this.questionAnswerRepository.delete({ id: answerId });
  }

  async patchQuestionAnswer(
    userId: number,
    answerId: number,
    body: QuestionAnswerPostDto,
  ) {
    const isAnaswer = await this.questionAnswerRepository.findOne({
      id: answerId,
    });

    if (!isAnaswer) {
      throw new NotFoundException();
    } else if (userId !== isAnaswer.userId) {
      throw new UnauthorizedException();
    }

    await this.questionAnswerRepository.update({ id: answerId }, body);
  }
}
