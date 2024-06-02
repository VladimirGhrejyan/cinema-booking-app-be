import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// controller
import { RoomController } from './room.controller';
// providers
import { RoomService } from './room.service';
import { RoomHelper } from './room.helper';
// entities
import { Room } from '~entities/room.entity';
// modules
import { SeatModule } from '~modules/seat/seat.module';

@Module({
  controllers: [RoomController],
  providers: [RoomService, RoomHelper],
  imports: [TypeOrmModule.forFeature([Room]), SeatModule],
})
export class RoomModule {}
