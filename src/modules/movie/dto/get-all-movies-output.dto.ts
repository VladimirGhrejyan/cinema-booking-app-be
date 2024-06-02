import { Expose, Type } from 'class-transformer';
import { GetOneMovieOutputDto } from '~modules/movie/dto/get-one-movie-output.dto';

export class GetAllMoviesOutputDto {
  @Expose()
  @Type(() => GetOneMovieOutputDto)
  items: GetOneMovieOutputDto[];
}
