import { IsInt, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMovieInputDto {
  @IsString()
  @Length(1, 50)
  title: string;

  @IsString()
  @Length(1, 500)
  description: string;

  @Type(() => Number)
  @IsInt()
  duration: number;
}
