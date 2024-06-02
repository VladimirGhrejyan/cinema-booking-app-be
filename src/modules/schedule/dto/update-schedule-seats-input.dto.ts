import { IsArray, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateScheduleSeatsInputDto {
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true, message: 'Each seat ID must be an integer' })
  seatIds: number[];
}
