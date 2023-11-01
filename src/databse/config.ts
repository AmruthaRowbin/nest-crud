import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const DatabaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'devbyseb',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  logging:true
};