import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ScheduleTasksService {
  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    console.log('CRON JOB');
  }
}
