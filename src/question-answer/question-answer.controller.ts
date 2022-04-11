import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { QuestionAnswerPostDto } from './dto/question-answer-post.dto';
import { QuestionAnswerService } from './question-answer.service';

@Controller('question/answer')
export class QuestionAnswerController {
  constructor(private readonly questionAnswerService: QuestionAnswerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  async createQuestionAnswer(
    @Request() req: any,
    @Body() body: QuestionAnswerPostDto,
    @Query('questionId') questionId: number,
  ) {
    return this.questionAnswerService.postQuestionAnswer(
      req.user.userId,
      questionId,
      body,
    );
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  async deleteQuestionAnswer(
    @Request() req: any,
    @Query('answerId') answerId: number,
  ) {
    return this.questionAnswerService.deleteQuestionAanswer(
      req.user.userId,
      answerId,
    );
  }

  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  async patchQuestionAnswer(
    @Request() req: any,
    @Query('answerId') answerId: number,
    @Body() body: QuestionAnswerPostDto,
  ) {
    return this.questionAnswerService.patchQuestionAnswer(
      req.user.userId,
      answerId,
      body,
    );
  }
}
