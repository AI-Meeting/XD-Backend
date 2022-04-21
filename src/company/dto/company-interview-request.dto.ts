import { IsArray, IsNumber, IsString } from 'class-validator';

export class CompanyInterviewRequestDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsString()
  job: string;

  @IsString()
  field: string;

  @IsNumber()
  level: number;

  @IsString()
  description: string;

  @IsArray()
  question: string[];
}
