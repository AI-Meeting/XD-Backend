import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async userInfo(@Request() req: any) {
    return await this.userService.userInfo(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/interview')
  async myInterview(@Request() req: any) {
    return this.userService.myInterview(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/interview/review')
  async myInterviewReview(@Request() req: any) {
    return await this.userService.myInterviewReview(req.user.userId);
  }
}
