import { Request, Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { LoginService } from './login.service';
import { BeforeLogin } from 'src/middleware/beforeLogin.middleware';
import { LoginDto } from 'src/user/dto/login-user.dto';

@Controller()

export class LoginController {
    constructor(
        private readonly loginService: LoginService
    ) { }

    @UseInterceptors(BeforeLogin)
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.loginService.login(loginDto);
    }

}