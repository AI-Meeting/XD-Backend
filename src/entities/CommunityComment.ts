import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommunityBoard } from './CommunityBoard';
import { User } from './User';

@Index('id_UNIQUE', ['id'], { unique: true })
@Index('fk_comunity_comment_comunity_board1_idx', ['communityBoardId'], {})
@Index('fk_comunity_comment_user1_idx', ['userId'], {})
@Entity('community_comment', { schema: 'xddb' })
export class CommunityComment {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'community_board_id', unsigned: true })
  communityBoardId: number;

  @Column('int', { name: 'user_id', unsigned: true })
  userId: number;

  @Column('varchar', { name: 'content', length: 100 })
  content: string;

  @ManyToOne(
    () => CommunityBoard,
    (communityBoard) => communityBoard.communityComments,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'community_board_id', referencedColumnName: 'id' }])
  communityBoard: CommunityBoard;

  @ManyToOne(() => User, (user) => user.communityComments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
