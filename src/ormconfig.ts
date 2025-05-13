import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

const options: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'me',
  password: 'me',
  database: 'learn_nestjs',
  entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
};

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  ...options,
  synchronize: true,
  autoLoadEntities: true,
};

export const connectionSource = new DataSource(options);
