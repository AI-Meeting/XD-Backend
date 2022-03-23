import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './Company';
import { QuestionAnswer } from './QuestionAnswer';

@Index('id_UNIQUE', ['id'], { unique: true })
@Index('fk_question_company1_idx', ['companyId'], {})
@Entity('question', { schema: 'xddb' })
export class Question {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'company_id', unsigned: true })
  companyId: number;

  @Column('varchar', { name: 'question', length: 1000 })
  question: string;

  @ManyToOne(() => Company, (company) => company.questions, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'id' }])
  company: Company;

  @OneToMany(() => QuestionAnswer, (questionAnswer) => questionAnswer.question)
  questionAnswers: QuestionAnswer[];
}
