import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DatabaseConfig } from './databse/config';
import { ProductModule } from './product/product.module';
import { UserproductModule } from './userproduct/userproduct.module';

@Module({
  imports: [TypeOrmModule.forRoot(DatabaseConfig),UserModule, ProductModule, UserproductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
