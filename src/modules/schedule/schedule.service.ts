import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// entities
import { Schedule } from '~entities/schedule.entity';
// dto
import {
  GetOneScheduleOutputDto,
  GetAllSchedulesOutputDto,
  CreateScheduleInputDto,
  UpdateScheduleInputDto,
  UpdateScheduleSeatsInputDto,
} from './dto';
// services
import { ScheduleHelper } from './schedule.helper';
import { SeatService } from '~modules/seat/seat.service';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule) private readonly scheduleRepository: Repository<Schedule>,

    private readonly scheduleHelper: ScheduleHelper,

    private readonly seatService: SeatService,
  ) {}

  public async getOne(id: number): Promise<GetOneScheduleOutputDto> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id },
      relations: ['room', 'movie', 'scheduleSeats'],
    });

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    return schedule;
  }

  public async getAll(): Promise<GetAllSchedulesOutputDto> {
    const schedules = await this.scheduleRepository.find({
      relations: ['room', 'movie', 'scheduleSeats'],
    });

    if (!schedules) {
      throw new NotFoundException('Schedule not found');
    }

    return {
      items: schedules,
    };
  }

  public async getAllByRoomId(roomId: number): Promise<GetAllSchedulesOutputDto> {
    const schedules = await this.scheduleRepository.find({
      where: {
        roomId,
      },
      relations: ['room', 'movie', 'scheduleSeats'],
    });

    if (!schedules) {
      throw new NotFoundException('Room schedules not found');
    }

    return {
      items: schedules,
    };
  }

  public async createOne(dto: CreateScheduleInputDto): Promise<void> {
    const endTime = await this.scheduleHelper.getEndTimeOrThrowException(
      dto.startTime,
      dto.movieId,
      dto.roomId,
    );

    await this.scheduleRepository.manager.transaction(async (entityManager) => {
      const schedule = await this.scheduleRepository.save({ ...dto, endTime });

      await this.seatService.bulkCreateScheduleSeats(schedule.id, dto.roomId, entityManager);
    });
  }

  public async updateOne(id: number, dto: UpdateScheduleInputDto) {
    const endTime = await this.scheduleHelper.getEndTimeOrThrowException(
      dto.startTime,
      dto.movieId,
      dto.roomId,
      id,
    );

    await this.scheduleRepository.save({
      id,
      ...dto,
      endTime,
    });
  }

  public async deleteOne(id: number) {
    await this.scheduleRepository.delete(id);
  }

  public async updateScheduleSeats(id: number, dto: UpdateScheduleSeatsInputDto): Promise<void> {
    await this.seatService.bulkBookScheduleSeats(id, dto.seatIds);
  }
}
