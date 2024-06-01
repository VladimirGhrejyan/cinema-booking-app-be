import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// entities
import { Schedule, Seat } from './';

@Entity()
export class ScheduleSeat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: false })
  isBooked: boolean;

  @Column()
  scheduleId: number;

  @Column()
  seatId: number;

  @ManyToOne(() => Schedule, (schedule) => schedule.scheduleSeats)
  schedule: Schedule;

  @ManyToOne(() => Seat, (seat) => seat.scheduleSeats)
  seat: Seat;
}
