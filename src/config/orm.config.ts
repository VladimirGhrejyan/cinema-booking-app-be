import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const getOrmConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  port: Number(process.env.POSTGRES_PORT),
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + '/../orm/entities/**/*.entity{.ts}'],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: true,
  autoLoadEntities: true,
});
