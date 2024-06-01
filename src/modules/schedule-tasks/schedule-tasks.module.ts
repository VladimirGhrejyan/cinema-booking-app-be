import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
// services
import { ScheduleTasksService } from './schedule-tasks.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [ScheduleTasksService],
})
export class ScheduleTasksModule {}
