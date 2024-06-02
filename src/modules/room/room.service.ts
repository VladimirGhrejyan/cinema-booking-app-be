import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// entities
import { Room } from '~entities/room.entity';
// helper
import { RoomHelper } from './room.helper';
// dto
import {
  CreateRoomInputDto,
  GetAllRoomsOutputDto,
  GetOneRoomOutputDto,
  UpdateRoomInputDto,
} from './dto';
import { SeatService } from '~modules/seat/seat.service';
import { ROOM_COLUMNS_NUMBER, ROOM_ROWS_NUMBER } from '~common/constants';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
    private readonly roomHelper: RoomHelper,
    private readonly seatService: SeatService,
  ) {}

  public async getAll(): Promise<GetAllRoomsOutputDto> {
    const rooms = await this.roomRepository.find({
      select: ['id', 'name', 'columnsNumber'],
    });

    if (!rooms) {
      throw new NotFoundException('Rooms not found');
    }

    return {
      items: rooms,
    };
  }

  public async getOne(id: number): Promise<GetOneRoomOutputDto> {
    const room = await this.roomRepository.findOne({
      where: {
        id,
      },
      select: ['id', 'name', 'columnsNumber'],
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return room;
  }

  public async createOne(dto: CreateRoomInputDto): Promise<void> {
    await this.roomHelper.checkIfNameUniqueOrThrowException(dto.name);

    await this.roomRepository.manager.transaction(async (entityManager) => {
      const room = await this.roomRepository.save(dto);

      await this.seatService.bulkCreateRoomSeats(
        room.id,
        ROOM_ROWS_NUMBER,
        ROOM_COLUMNS_NUMBER,
        entityManager,
      );
    });
  }

  public async updateOne(id: number, dto: UpdateRoomInputDto): Promise<void> {
    await this.roomHelper.checkIfNameUniqueOrThrowException(dto.name, id);

    await this.roomRepository.save({
      id,
      ...dto,
    });
  }

  public async deleteOne(id: number): Promise<void> {
    await this.roomRepository.delete(id);
  }
}
