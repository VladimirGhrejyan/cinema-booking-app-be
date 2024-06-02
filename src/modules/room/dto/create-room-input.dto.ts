import { IsString, Length } from 'class-validator';

export class CreateRoomInputDto {
  @IsString()
  @Length(1, 20)
  name: string;
}
