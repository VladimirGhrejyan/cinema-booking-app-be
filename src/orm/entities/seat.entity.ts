import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// entities
import { ScheduleSeat, Room } from './';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  number: number;

  @Column()
  roomId: number;

  @ManyToOne(() => Room, (room) => room.seats, { onDelete: 'CASCADE' })
  room: Room;

  @OneToMany(() => ScheduleSeat, (scheduleSeat) => scheduleSeat.seat, { cascade: true })
  scheduleSeats: ScheduleSeat[];
}
