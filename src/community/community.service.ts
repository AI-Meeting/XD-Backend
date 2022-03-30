import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { cp } from 'fs';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import { CommunityBoard } from '../entities/CommunityBoard';
import { CommunityComment } from '../entities/CommunityComment';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(CommunityBoard)
    private readonly communityBoardRepository: Repository<CommunityBoard>,
    @InjectRepository(CommunityComment)
    private readonly communityCommentRepository: Repository<CommunityComment>,
  ) {}

  async createBoard(body: CreateBoardDto, req: any) {
    const { content, category } = body;

    if (
      category !== 'SCHOOL' &&
      category !== 'COMPANY' &&
      category !== 'INTERVIEW' &&
      category !== 'ETC'
    ) {
      throw new BadRequestException();
    }

    await this.communityBoardRepository.save({
      userId: req.sub,
      category,
      content,
    });

    return;
  }

  async getCommunityBoard(
    category: string | undefined,
  ): Promise<CommunityBoard[]> {
    let communityBoardList = null;
    if (category === undefined) {
      communityBoardList = await this.communityBoardRepository.find({
        order: { id: 'DESC' },
      });
    } else {
      communityBoardList = await this.communityBoardRepository.find({
        where: { category: category },
        order: { id: 'DESC' },
      });
    }

    if (!communityBoardList) {
      return [];
    }

    return communityBoardList;
  }

  async getBoardComment(id: string): Promise<CommunityComment[]> {
    const communityCommentList = await this.communityCommentRepository.find({
      where: {
        communityBoardId: id,
      },
      order: {
        id: 'DESC',
      },
    });

    return communityCommentList;
  }

  async deleteComment(id: string, user: any) {
    const comment = await this.communityCommentRepository.findOne({
      where: { id: id },
    });

    if (!comment) {
      throw new NotFoundException();
    } else if (comment.userId !== parseInt(user.sub)) {
      throw new UnauthorizedException();
    }

    await this.communityCommentRepository.delete({ id: parseInt(id) });
  }
}
