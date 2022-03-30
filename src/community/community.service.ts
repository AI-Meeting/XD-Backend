import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import { CommunityBoard } from '../entities/CommunityBoard';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(CommunityBoard)
    private readonly communityBoard: Repository<CommunityBoard>,
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

    await this.communityBoard.save({
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
      communityBoardList = await this.communityBoard.find({
        order: { id: 'DESC' },
      });
    } else {
      communityBoardList = await this.communityBoard.find({
        where: { category: category },
        order: { id: 'DESC' },
      });
    }

    if (!communityBoardList) {
      return [];
    }

    return communityBoardList;
  }
}
