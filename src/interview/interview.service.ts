import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interview } from '../entities/Interview';
import { InterviewPostDto } from './dto/interview-post.dto';

@Injectable()
export class InterviewService {
  @InjectRepository(Interview)
  private readonly interviewRepository: Repository<Interview>;

  async postInterview(questionId: number, interview: InterviewPostDto) {
    const question = await this.interviewRepository.find({ id: questionId });

    return await this.interviewRepository.createQueryBuilder();
  }
}
