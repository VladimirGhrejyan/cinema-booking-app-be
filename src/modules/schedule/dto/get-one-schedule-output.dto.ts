import { Expose, Type } from 'class-transformer';
import { GetOneMovieOutputDto } from '~modules/movie/dto';
import { GetOneRoomOutputDto } from '~modules/room/dto';
import { GetOneScheduleSeatOutputDto } from './';

export class GetOneScheduleOutputDto {
  @Expose()
  id: number;

  @Expose()
  startTime: string;

  @Expose()
  endTime: string;

  @Expose()
  @Type(() => GetOneRoomOutputDto)
  room: GetOneRoomOutputDto;

  @Expose()
  @Type(() => GetOneMovieOutputDto)
  movie: GetOneMovieOutputDto;

  @Expose()
  @Type(() => GetOneScheduleSeatOutputDto)
  scheduleSeats: GetOneScheduleSeatOutputDto[];
}
