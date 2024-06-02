import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ScheduleHelper } from '~modules/schedule/schedule.helper';
import { SeatService } from '~modules/seat/seat.service';

@Injectable()
export class ScheduleTasksService {
  constructor(
    private readonly scheduleHelper: ScheduleHelper,
    private readonly seatService: SeatService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron(): Promise<void> {
    const scheduleIds = await this.scheduleHelper.getExpiredSchedules(3);

    if (scheduleIds?.length) {
      await this.seatService.bulkUnbookSchedulesSeats(scheduleIds.map(({ id }) => id));
    }
  }
}
