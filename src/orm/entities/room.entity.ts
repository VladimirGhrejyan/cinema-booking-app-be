import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// entities
import { Seat, Schedule } from './';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'integer' })
  rows: number;

  @Column({ type: 'integer' })
  columns: number;

  @OneToMany(() => Seat, (seat) => seat.room, { cascade: true })
  seats: Seat[];

  @OneToMany(() => Schedule, (seat) => seat.room, { cascade: true })
  schedules: Schedule[];
}
