import {
  Body,
  Controller,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { InterviewService } from './interview.service';
import { AuthGuard } from '@nestjs/passport';
import { InterviewPostDto } from './dto/interview-post.dto';

@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewSerivce: InterviewService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('')
  async postInterview(
    @Request() req: any,
    @Body() body: InterviewPostDto,
    @Query('questionId') questionId: number,
  ) {
    return this.interviewSerivce.postInterview(questionId, body);
  }
}
