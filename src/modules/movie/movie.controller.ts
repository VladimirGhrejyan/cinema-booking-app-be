import {
  ParseIntPipe,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// services
import { MovieService } from '~modules/movie/movie.service';
import {
  CreateMovieInputDto,
  GetAllMoviesOutputDto,
  GetOneMovieOutputDto,
  UpdateMovieInputDto,
} from '~modules/movie/dto';

@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get movie  by id', operationId: 'getMovieById' })
  public async getOneMovie(@Param('id', ParseIntPipe) id: number): Promise<GetOneMovieOutputDto> {
    return this.movieService.getOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all movies', operationId: 'getAllMovies' })
  public async getAllMovies(): Promise<GetAllMoviesOutputDto> {
    return this.movieService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create Movie', operationId: 'createMovie' })
  @UseInterceptors(FileInterceptor('image'))
  public async createMovie(
    @Body() dto: CreateMovieInputDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    return this.movieService.createOne(dto, image);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Movie', operationId: 'updateMovie' })
  @UseInterceptors(FileInterceptor('image'))
  public async updateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMovieInputDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<void> {
    return this.movieService.updateOne(id, dto, image);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Movie', operationId: 'deleteMovie' })
  public async deleteMovie(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.movieService.deleteOne(id);
  }
}
