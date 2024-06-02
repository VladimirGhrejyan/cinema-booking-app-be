import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// providers
import { SeatService } from './seat.service';
// entities
import { Seat } from '~entities/seat.entity';
import { ScheduleSeat } from '~entities/schedule-seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seat, ScheduleSeat])],
  providers: [SeatService],
  exports: [SeatService],
})
export class SeatModule {}
