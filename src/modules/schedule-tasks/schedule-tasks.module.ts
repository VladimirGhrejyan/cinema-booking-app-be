import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
// services
import { ScheduleTasksService } from './schedule-tasks.service';
// modules
import { SeatModule } from '~modules/seat/seat.module';
import { ScheduleModule as InternalScheduleModule } from '~modules/schedule/schedule.module';

@Module({
  imports: [ScheduleModule.forRoot(), SeatModule, InternalScheduleModule],
  providers: [ScheduleTasksService],
})
export class ScheduleTasksModule {}
