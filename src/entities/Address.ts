import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './Company';

@Index('id_UNIQUE', ['id'], { unique: true })
@Entity('address', { schema: 'xddb' })
export class Address {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'location', nullable: true, length: 255 })
  location: string | null;

  @Column('int', { name: 'latitude', nullable: true })
  latitude: number | null;

  @Column('int', { name: 'longitude', nullable: true })
  longitude: number | null;

  @OneToMany(() => Company, (company) => company.address)
  companies: Company[];
}
