import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() user: SignUpDto) {
    await this.authService.signUp(user);

    return { status: 201, message: 'success' };
  }

  @Post('login')
  async login(@Body() request: LoginRequestDto) {
    return await this.authService.login(request);
  }
}
