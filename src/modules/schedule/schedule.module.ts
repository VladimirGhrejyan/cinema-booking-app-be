import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { ScheduleHelper } from './schedule.helper';
// entities
import { Schedule } from '~entities/schedule.entity';
import { Movie } from '~entities/movie.entity';
import { SeatModule } from '~modules/seat/seat.module';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleHelper],
  imports: [TypeOrmModule.forFeature([Schedule, Movie]), SeatModule],
  exports: [ScheduleHelper],
})
export class ScheduleModule {}
