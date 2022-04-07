import { IsNumber, IsString } from 'class-validator';

export class CompanyListResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsString()
  description: string;

  @IsNumber()
  level: number;

  @IsString()
  job: string;

  @IsString()
  field: string;

  @IsNumber()
  questionCnt: number;
}
