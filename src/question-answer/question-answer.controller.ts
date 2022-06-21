import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { QuestionAnswerPostDto } from './dto/question-answer-post.dto';
import { QuestionAnswerService } from './question-answer.service';

@Controller('question/answer')
export class QuestionAnswerController {
  constructor(private readonly questionAnswerService: QuestionAnswerService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  async createQuestionAnswer(
    @Request() req: any,
    @Query('questionId') questionId: number,
    @Query('companyId') companyId: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: QuestionAnswerPostDto,
  ) {
    return this.questionAnswerService.postQuestionAnswer(
      req.user.userId,
      files,
      questionId,
      companyId,
      body,
    );
  }

  @Delete('/:answerId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  async deleteQuestionAnswer(@Request() req: any, @Param() answerId: any) {
    return this.questionAnswerService.deleteQuestionAanswer(
      req.user.userId,
      answerId.answerId,
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
