import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import {TypeOrmModule} from "@nestjs/typeorm/dist"
import { AuthGuard } from 'src/middleware/auth.middleware';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})

export class UserModule { }
