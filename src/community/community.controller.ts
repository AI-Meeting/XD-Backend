import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { CommunityBoard } from '../entities/CommunityBoard';
import { CommunityComment } from '../entities/CommunityComment';
import { CommunityService } from './community.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { CreateCommentRequestDto } from './dto/create-comment.dto';

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

  @Get(':id')
  async getBoardComment(@Param('id') id: string): Promise<CommunityComment[]> {
    return await this.communityService.getBoardComment(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('comments/:id')
  async deleteComment(@Param('id') id: string, @Request() req: any) {
    await this.communityService.deleteComment(id, req.user);
    return {
      status: 201,
      message: 'success',
    };
  }
}
