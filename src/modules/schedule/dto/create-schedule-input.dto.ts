import { IsString, Validate, IsInt } from 'class-validator';
import { TimeFormatValidator } from '~common/validators/time-format.validator';

export class CreateScheduleInputDto {
  @IsString()
  @Validate(TimeFormatValidator)
  startTime: string;

  @IsInt()
  roomId: number;

  @IsInt()
  movieId: number;
}
