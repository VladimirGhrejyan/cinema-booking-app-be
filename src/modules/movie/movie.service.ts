import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// services
import { FileService } from '~modules/file/file.service';
// entities
import { Movie } from '~entities/movie.entity';
// dto
import {
  CreateMovieInputDto,
  GetAllMoviesOutputDto,
  GetOneMovieOutputDto,
  UpdateMovieInputDto,
} from './dto';

@Injectable()
export class MovieService {
  constructor(
    private readonly fileService: FileService,
    @InjectRepository(Movie) private readonly movieRepository: Repository<Movie>,
  ) {}

  public async getAll(): Promise<GetAllMoviesOutputDto> {
    const movies = await this.movieRepository.find();

    if (!movies) {
      throw new NotFoundException('Movies not found');
    }

    return {
      items: movies,
    };
  }

  public async getOne(id: number): Promise<GetOneMovieOutputDto> {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  public async createOne(dto: CreateMovieInputDto, image: Express.Multer.File): Promise<void> {
    const poster = await this.fileService.createFile(image);

    await this.movieRepository.save({
      ...dto,
      poster,
    });
  }

  public async updateOne(
    id: number,
    dto: UpdateMovieInputDto,
    image?: Express.Multer.File,
  ): Promise<void> {
    let poster: string = '';

    if (image) {
      poster = await this.fileService.createFile(image);
    }

    await this.movieRepository.save({
      id,
      ...dto,
      ...(poster && { poster }),
    });
  }

  public async deleteOne(id: number): Promise<void> {
    await this.movieRepository.delete(id);
  }
}
