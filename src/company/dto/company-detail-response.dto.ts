import { IsArray, IsNumber, IsString } from 'class-validator';

export class CompanyDetailResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  userName: string;

  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsNumber()
  level: number;

  @IsString()
  job: string;

  @IsString()
  field: string;

  @IsString()
  description: string;

  @IsArray()
  question: QuestionDto[];
}

export class QuestionDto {
  @IsNumber()
  questionId: number;

  @IsNumber()
  answerId: 1 | -1;

  @IsString()
  answer: string;

  @IsString()
  voiceUrl: string;

  @IsString()
  videoUrl: string;
}
