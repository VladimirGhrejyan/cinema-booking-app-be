import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'node:process';
// config
import { getOrmConfig } from '~config/orm.config';
// config
import { ScheduleTasksModule } from '~modules/schedule-tasks/schedule-tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot(getOrmConfig()),
    ScheduleTasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
