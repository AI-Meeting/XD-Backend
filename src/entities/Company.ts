import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './Address';
import { User } from './User';
import { Interview } from './Interview';
import { Question } from './Question';

@Index('company_id_UNIQUE', ['id'], { unique: true })
@Index('fk_company_user_idx', ['userId'], {})
@Index('fk_company_address1_idx', ['addressId'], {})
@Entity('company', { schema: 'xddb' })
export class Company {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'user_id', unsigned: true })
  userId: number;

  @Column('int', { name: 'address_id', unsigned: true })
  addressId: number;

  @Column('varchar', { name: 'name', length: 45 })
  name: string;

  @Column('varchar', { name: 'description', length: 255 })
  description: string;

  @Column('float', { name: 'level', unsigned: true })
  level: number;

  @Column('varchar', { name: 'job', length: 45 })
  job: string;

  @Column('varchar', { name: 'field', nullable: true, length: 45 })
  field: string | null;

  @ManyToOne(() => Address, (address) => address.companies, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
  address: Address;

  @ManyToOne(() => User, (user) => user.companies, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(() => Interview, (interview) => interview.company)
  interviews: Interview[];

  @OneToMany(() => Question, (question) => question.company)
  questions: Question[];
}
