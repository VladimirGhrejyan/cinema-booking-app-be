import { IsString, Length } from 'class-validator';

export class UpdateMovieInputDto {
  @IsString()
  @Length(1, 50)
  title: string;

  @IsString()
  @Length(1, 500)
  description: string;
}
