import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual, Not } from 'typeorm';
import { addMinutes, format, isValid, parse } from 'date-fns';
// entities
import { Schedule } from '~entities/schedule.entity';
import { Movie } from '~entities/movie.entity';

@Injectable()
export class ScheduleHelper {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  public async getEndTimeOrThrowException(
    startTime: string,
    movieId: number,
    roomId: number,
    scheduleId?: number,
  ): Promise<string> {
    const movie = await this.movieRepository.findOne({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    const startMoment = parse(startTime, 'HH:mm', new Date());
    if (!isValid(startMoment)) {
      throw new Error(`Invalid start time format: ${startTime}`);
    }
    const endMoment = addMinutes(startMoment, movie.duration);
    const endTime = format(endMoment, 'HH:mm');

    const conflictingSchedules = await this.scheduleRepository.find({
      where: {
        roomId,
        startTime: LessThanOrEqual(endTime),
        endTime: MoreThanOrEqual(startTime),
        ...(scheduleId && { id: Not(scheduleId) }),
      },
    });

    if (conflictingSchedules?.length > 0) {
      throw new ConflictException('Schedule overlaps with an existing schedule in the same room');
    }

    return endTime;
  }

  public async getExpiredSchedules(minutesAgo: number): Promise<Schedule[]> {
    const endTimeThreshold = new Date();
    endTimeThreshold.setMinutes(endTimeThreshold.getMinutes() - minutesAgo);

    const formattedEndTime = format(endTimeThreshold, 'HH:mm:ss');

    return this.scheduleRepository.find({
      where: {
        endTime: LessThanOrEqual(formattedEndTime),
      },
    });
  }
}
