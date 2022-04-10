import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interview } from '../entities/Interview';
import { InterviewController } from './interview.controller';
import { InterviewService } from './interview.service';

@Module({
  imports: [TypeOrmModule.forFeature([Interview])],
  controllers: [InterviewController],
  providers: [InterviewService],
})
export class InterviewModule {}
