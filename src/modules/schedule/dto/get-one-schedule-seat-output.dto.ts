import { Expose } from 'class-transformer';

export class GetOneScheduleSeatOutputDto {
  @Expose()
  id: number;

  @Expose()
  isBooked: boolean;

  @Expose()
  number: number;

  @Expose()
  scheduleId: number;

  @Expose()
  seatId: number;
}
