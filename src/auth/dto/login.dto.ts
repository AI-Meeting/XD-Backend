import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginRequestDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @Length(4, 12)
  @IsNotEmpty()
  readonly password: string;
}
