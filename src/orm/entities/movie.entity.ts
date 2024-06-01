import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// entities
import { Schedule } from './';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'varchar', length: 250 })
  description: string;

  @Column({ type: 'integer' })
  duration: number; // in minutes

  @OneToMany(() => Schedule, (schedule) => schedule.movie, { cascade: true })
  schedules: Schedule[];
}
