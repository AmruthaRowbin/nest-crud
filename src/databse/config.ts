import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config(); 
export const DatabaseConfig: TypeOrmModuleOptions = {
  type: process.env.DATABASE_TYPE as 'mysql', 
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10), 
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME, 
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
};
