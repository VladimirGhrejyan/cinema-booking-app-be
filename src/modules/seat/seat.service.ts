import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
// entities
import { Seat } from '~entities/seat.entity';
import { ScheduleSeat } from '~entities/schedule-seat.entity';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat) private readonly seatRepository: Repository<Seat>,
    @InjectRepository(ScheduleSeat)
    private readonly scheduleSeatRepository: Repository<ScheduleSeat>,
  ) {}

  public async bulkCreateRoomSeats(
    roomId: number,
    rowsNumber: number,
    columnsNumber: number,
    manager?: EntityManager,
  ) {
    const currentSeatRepository = manager ? manager.getRepository(Seat) : this.seatRepository;

    const preparedData = currentSeatRepository.create(
      new Array(rowsNumber * columnsNumber).fill(null).map((_, index) => ({
        roomId,
        number: index + 1,
      })),
    );

    await currentSeatRepository.save(preparedData);
  }

  public async bulkCreateScheduleSeats(
    scheduleId: number,
    roomId: number,
    manager?: EntityManager,
  ) {
    const currentScheduleSeatRepository = manager
      ? manager.getRepository(ScheduleSeat)
      : this.scheduleSeatRepository;

    const currentSeatRepository = manager ? manager.getRepository(Seat) : this.seatRepository;

    const roomSeats = await currentSeatRepository.find({
      where: {
        roomId,
      },
    });

    if (!roomSeats) {
      throw new NotFoundException('Room seats not found');
    }

    const preparedData = currentScheduleSeatRepository.create(
      roomSeats.map(({ id, number }) => ({
        seatId: id,
        number,
        scheduleId,
        isBooked: false,
      })),
    );

    await currentScheduleSeatRepository.save(preparedData);
  }

  public async bulkBookScheduleSeats(scheduleId: number, seatIds: number[]): Promise<void> {
    await this.scheduleSeatRepository.update({ scheduleId, id: In(seatIds) }, { isBooked: true });
  }

  public async bulkUnbookSchedulesSeats(scheduleIds: number[]): Promise<void> {
    await this.scheduleSeatRepository.update({ scheduleId: In(scheduleIds) }, { isBooked: true });
  }
}
