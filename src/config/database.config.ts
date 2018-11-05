import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'LuoyuzhoU_1996',
  database: 'ink',
  entities: [
    process.env.NODE_ENV === 'production' ?
      'dist/entity/*.entity{.ts,.js}'
      :
      'src/entity/*.entity{.ts,.js}',
  ],
  synchronize: true,
};
