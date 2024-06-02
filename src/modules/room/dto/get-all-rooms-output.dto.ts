import { Expose, Type } from 'class-transformer';
import { GetOneRoomOutputDto } from '../dto';

export class GetAllRoomsOutputDto {
  @Expose()
  @Type(() => GetOneRoomOutputDto)
  items: GetOneRoomOutputDto[];
}
