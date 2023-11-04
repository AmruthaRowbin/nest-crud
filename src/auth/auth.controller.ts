import { Controller, Post, Body, UseGuards ,Get} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoggerMiddleware } from 'src/logger/logger.middleware';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
@UseGuards(LoggerMiddleware)
  @Post()
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return "Success login";
  }
}
