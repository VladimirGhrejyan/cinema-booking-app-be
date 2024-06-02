import { Expose } from 'class-transformer';

export class GetOneRoomOutputDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  columnsNumber: number;
}
