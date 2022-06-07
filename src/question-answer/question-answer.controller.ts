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
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: QuestionAnswerPostDto,
  ) {
    return this.questionAnswerService.postQuestionAnswer(
      req.user.userId,
      files,
      questionId,
      body,
    );
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  async deleteQuestionAnswer(@Request() req: any, @Body() answerId: number) {
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
