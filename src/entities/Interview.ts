import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './Company';
import { User } from './User';

@Index('fk_interview_user1_idx', ['userId'], {})
@Index('fk_interview_company1_idx', ['companyId'], {})
@Entity('interview', { schema: 'xddb' })
export class Interview {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'user_id', unsigned: true })
  userId: number;

  @Column('int', { name: 'company_id', unsigned: true })
  companyId: number;

  @ManyToOne(() => Company, (company) => company.interviews, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'id' }])
  company: Company;

  @ManyToOne(() => User, (user) => user.interviews, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
