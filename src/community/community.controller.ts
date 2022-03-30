import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { CommunityBoard } from '../entities/CommunityBoard';
import { CommunityService } from './community.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createBoard(@Body() body: CreateBoardDto, @Request() req: any) {
    await this.communityService.createBoard(body, req.user);
    return { status: 201, message: 'success' };
  }

  @Get()
  async getCommunityBoard(
    @Query('category') category: string | undefined,
  ): Promise<CommunityBoard[]> {
    return await this.communityService.getCommunityBoard(category);
  }
}
