import { IsEmail, IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsString()
  @Length(3, 20)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(4, 12)
  readonly password: string;

  @IsString()
  readonly school: string;
}
