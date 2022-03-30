import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommunityBoard } from './CommunityBoard';
import { CommunityComment } from './CommunityComment';
import { Company } from './Company';
import { Interview } from './Interview';
import { QuestionAnswer } from './QuestionAnswer';

@Index('id_UNIQUE', ['id'], { unique: true })
@Index('email_UNIQUE', ['email'], { unique: true })
@Index('IDX_e12875dfb3b1d92d7d7c5377e2', ['email'], { unique: true })
@Entity('user', { schema: 'xddb' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'name', length: 10 })
  name: string;

  @Column('varchar', { name: 'email', unique: true, length: 45 })
  email: string;

  @Column('char', { name: 'password', length: 60 })
  password: string;

  @Column('varchar', { name: 'school', length: 30 })
  school: string;

  @OneToMany(() => CommunityBoard, (communityBoard) => communityBoard.user)
  communityBoards: CommunityBoard[];

  @OneToMany(
    () => CommunityComment,
    (communityComment) => communityComment.user,
  )
  communityComments: CommunityComment[];

  @OneToMany(() => Company, (company) => company.user)
  companies: Company[];

  @OneToMany(() => Interview, (interview) => interview.user)
  interviews: Interview[];

  @OneToMany(() => QuestionAnswer, (questionAnswer) => questionAnswer.user)
  questionAnswers: QuestionAnswer[];
}
