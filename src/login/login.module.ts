import { Module, NestModule, MiddlewareConsumer ,RequestMethod} from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from "@nestjs/typeorm/dist"
import { User } from 'src/user/entities/user.entity';
import { BeforeLogin } from 'src/middleware/beforeLogin.middleware';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [LoginController],
    providers: [LoginService],
    exports: [LoginService]
})
export class LoginModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(BeforeLogin).forRoutes({path: 'login', method: RequestMethod.POST});
      }
}