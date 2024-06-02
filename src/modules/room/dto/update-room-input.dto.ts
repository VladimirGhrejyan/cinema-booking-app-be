import { IsString, Length } from 'class-validator';

export class UpdateRoomInputDto {
  @IsString()
  @Length(1, 50)
  name: string;
}
