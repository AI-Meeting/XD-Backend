import { IsString } from 'class-validator';

export class QuestionAnswerPostDto {
  @IsString()
  answer: string;

  @IsString()
  videoUrl: string;

  @IsString()
  voiceUrl: string;
}
