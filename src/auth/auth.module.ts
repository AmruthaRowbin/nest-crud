import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule , ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';

@Module({
  imports:[
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory:async (configService: ConfigService)=>({
        secret: "ammu1234567",
        signOptions: { expiresIn: '1h' },

      }),
      inject:[ConfigService]
     
    }),
    

  ],
  exports: [AuthService], 
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
})
export class AuthModule {}
