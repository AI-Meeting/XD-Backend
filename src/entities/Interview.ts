import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Company } from './Company';

@Index('fk_interview_user1_idx', ['userId'], {})
@Index('fk_interview_company1_idx', ['companyId'], {})
@Entity('interview', { schema: 'xddb' })
export class Interview {
  @Column('int', { primary: true, name: 'id' })
  id: number;

  @Column('int', { name: 'user_id', unsigned: true })
  userId: number;

  @Column('int', { name: 'company_id', unsigned: true })
  companyId: number;

  @ManyToOne(() => User, (user) => user.interviews, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Company, (company) => company.interviews, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'id' }])
  company: Company;
}
