import { Module } from '@nestjs/common';
// controller
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { FileModule } from '~modules/file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '~entities/movie.entity';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  imports: [FileModule, TypeOrmModule.forFeature([Movie])],
})
export class MovieModule {}
