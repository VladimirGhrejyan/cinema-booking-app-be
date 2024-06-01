import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// entities
import { Room, Movie, ScheduleSeat } from './';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column()
  roomId: number;

  @Column()
  movieId: number;

  @ManyToOne(() => Room, (room) => room.schedules)
  room: Room;

  @ManyToOne(() => Movie, (movie) => movie.schedules)
  movie: Movie;

  @OneToMany(() => ScheduleSeat, (scheduleSeat) => scheduleSeat.schedule, { cascade: true })
  scheduleSeats: ScheduleSeat[];
}
