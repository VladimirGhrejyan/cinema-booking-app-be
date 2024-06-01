import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// entities
import { ScheduleSeat, Room } from './';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  row: number;

  @Column({ type: 'integer' })
  column: number;

  @Column()
  roomId: number;

  @ManyToOne(() => Room, (room) => room.seats)
  room: Room;

  @OneToMany(() => ScheduleSeat, (scheduleSeat) => scheduleSeat.seat)
  scheduleSeats: ScheduleSeat[];
}
