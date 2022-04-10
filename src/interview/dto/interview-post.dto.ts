import { IsString } from 'class-validator';

export class InterviewPostDto {
  @IsString()
  answer: string;

  @IsString()
  videoUrl: string;

  @IsString()
  voiceUrl: string;
}
