import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DatabaseConfig } from './databse/config';
import { ProductModule } from './product/product.module';
import { UserproductModule } from './userproduct/userproduct.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { JwtStrategy } from './auth/jwt.strategy';
import { LoginModule } from './login/login.module';


@Module({
  imports: [TypeOrmModule.forRoot(DatabaseConfig), UserModule, ProductModule, UserproductModule, AuthModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
