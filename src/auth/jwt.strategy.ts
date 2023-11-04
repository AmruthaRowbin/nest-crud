import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,"jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "ammu1234567", 
      signOptions: { expiresIn: '1h' }
    });
  }

  async validate(payload:{userId:number}){
    return{
      userId:payload.userId
    }
  }
}
