import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { User } from '../entities/User';
import { CommunityBoard } from '../entities/CommunityBoard';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, CommunityBoard])],
  controllers: [CommunityController],
  providers: [CommunityService],
})
export class CommunityModule {}
