import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'node:process';
import * as path from 'path';
// config
import { getOrmConfig } from '~config/orm.config';
// modules
import { ScheduleTasksModule } from '~modules/schedule-tasks/schedule-tasks.module';
import { RoomModule } from '~modules/room/room.module';
import { MovieModule } from '~modules/movie/movie.module';
import { ScheduleModule } from '~modules/schedule/schedule.module';
// common
import { STATIC_FILES_PATH } from '~common/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', STATIC_FILES_PATH),
      serveRoot: '/static',
    }),
    TypeOrmModule.forRoot(getOrmConfig()),
    ScheduleTasksModule,
    RoomModule,
    MovieModule,
    ScheduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
