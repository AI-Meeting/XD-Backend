import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async userInfo() {
    return await this.userService.userInfo();
  }

  @Get('/interview/review')
  async myInterviewReview() {
    return await this.userService.myInterviewReview(2);
  }

  @Get('/interview')
  async myInterview() {
    return this.userService.myInterview();
  }
}
