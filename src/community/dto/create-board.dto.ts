import { IsEnum, IsString, Length } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @Length(400)
  content: string;

  @IsString()
  category: 'SCHOOL' | 'COMPANY' | 'INTERVIEW' | 'ETC';
}
