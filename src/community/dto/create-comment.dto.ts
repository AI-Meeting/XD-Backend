import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentRequestDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
