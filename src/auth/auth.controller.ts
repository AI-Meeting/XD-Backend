import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() user: SignUpDto) {
    console.log(user);
    await this.authService.signUp(user);

    return { status: 201, message: 'success' };
  }
}
