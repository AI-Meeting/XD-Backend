import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './Question';
import { User } from './User';

@Index('id_UNIQUE', ['id'], { unique: true })
@Index('fk_question_answer_user1_idx', ['userId'], {})
@Index('fk_question_answer_question1_idx', ['questionId'], {})
@Entity('question_answer', { schema: 'xddb' })
export class QuestionAnswer {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'user_id', unsigned: true })
  userId: number;

  @Column('int', { name: 'question_id', unsigned: true })
  questionId: number;

  @Column('varchar', { name: 'answer', length: 1500 })
  answer: string;

  @Column('varchar', { name: 'voice_url', nullable: true, length: 300 })
  voiceUrl: string | null;

  @Column('varchar', { name: 'video_url', nullable: true, length: 300 })
  videoUrl: string | null;

  @ManyToOne(() => Question, (question) => question.questionAnswers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'question_id', referencedColumnName: 'id' }])
  question: Question;

  @ManyToOne(() => User, (user) => user.questionAnswers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
