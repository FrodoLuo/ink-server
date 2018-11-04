import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions =  {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'LUOYUZHOU_1996',
  database: 'ink',
  entities: ['src/entity/*.entity{.ts,.js}'],
  synchronize: true,
};