import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './Company';
import { QuestionAnswer } from './QuestionAnswer';
import { Interview } from './Interview';
import { CommunityBoard } from './CommunityBoard';
import { CommunityComment } from './CommunityComment';

@Index('id_UNIQUE', ['id'], { unique: true })
@Index('email_UNIQUE', ['email'], { unique: true })
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

  @OneToMany(() => Company, (company) => company.user)
  companies: Company[];

  @OneToMany(() => QuestionAnswer, (questionAnswer) => questionAnswer.user)
  questionAnswers: QuestionAnswer[];

  @OneToMany(() => Interview, (interview) => interview.user)
  interviews: Interview[];

  @OneToMany(() => CommunityBoard, (communityBoard) => communityBoard.user)
  communityBoards: CommunityBoard[];

  @OneToMany(
    () => CommunityComment,
    (communityComment) => communityComment.user,
  )
  communityComments: CommunityComment[];
}
