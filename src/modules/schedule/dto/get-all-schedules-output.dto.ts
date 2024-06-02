import { Expose, Type } from 'class-transformer';
import { GetOneScheduleOutputDto } from './get-one-schedule-output.dto';

export class GetAllSchedulesOutputDto {
  @Expose()
  @Type(() => GetOneScheduleOutputDto)
  items: GetOneScheduleOutputDto[];
}
