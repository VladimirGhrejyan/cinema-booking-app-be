import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// entities
import { Schedule, Seat } from './';

@Entity()
export class ScheduleSeat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: false })
  isBooked: boolean;

  @Column({ type: 'integer' })
  number: number;

  @Column()
  scheduleId: number;

  @Column()
  seatId: number;

  @ManyToOne(() => Schedule, (schedule) => schedule.scheduleSeats, { onDelete: 'CASCADE' })
  schedule: Schedule;

  @ManyToOne(() => Seat, (seat) => seat.scheduleSeats, { onDelete: 'CASCADE' })
  seat: Seat;
}
