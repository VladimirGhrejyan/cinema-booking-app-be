import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// entities
import { Seat, Schedule } from './';
// constants
import { ROOM_COLUMNS_NUMBER } from '~common/constants';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'integer', default: ROOM_COLUMNS_NUMBER })
  columnsNumber: number;

  @OneToMany(() => Seat, (seat) => seat.room, { cascade: true })
  seats: Seat[];

  @OneToMany(() => Schedule, (seat) => seat.room, { cascade: true })
  schedules: Schedule[];
}
