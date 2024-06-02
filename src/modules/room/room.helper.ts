import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '~entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomHelper {
  constructor(@InjectRepository(Room) private readonly roomRepository: Repository<Room>) {}

  public async checkIfNameUniqueOrThrowException(name: string, id?: number): Promise<void> {
    const room = await this.roomRepository.findOne({
      where: {
        name,
      },
    });

    if (room && room.id !== id) {
      throw new ConflictException(`Room with name ${name} already exists`);
    }
  }
}
