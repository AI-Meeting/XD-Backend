import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

  @UseGuards(AuthGuard('jwt'))
  @Get('/interview')
  async myInterview(@Request() req: any) {
    console.log(req.user.userId);
    return this.userService.myInterview(req.user.userId);
  }
}
