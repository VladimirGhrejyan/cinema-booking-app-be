import { Expose } from 'class-transformer';

export class GetOneMovieOutputDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  duration: number;

  @Expose()
  poster: string;
}
