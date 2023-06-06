import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pgAdmin',
  database: 'nurovic',
  entities: [`dist/**/**/*.entity{.ts,.js}`],
  synchronize: true,
  autoLoadEntities: true,
};
