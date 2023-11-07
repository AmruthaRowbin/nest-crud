import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { User } from 'src/user/entities/user.entity';
import { ErrorReponse, SuccessReponse } from 'src/helper/response';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(private Userervice: UserService, private jwtService: JwtService) { }

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);


    const payload = {
      userId: user.id,
      email: user.email,
      name: user.firstname,
      password: user.password
    };

    let access_token = this.jwtService.sign(payload);


    const responseData = {
      user_id: user.id,
      user_name: user.firstname,
      email: user.email,
      token: access_token
    };

    return SuccessReponse(responseData);
  }

  async validateUser(authLoginDto: AuthLoginDto) {
    const { email, password } = authLoginDto;

  const user = await this.Userervice.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');

    }

    if (!(await user.validatePassword(password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

}
