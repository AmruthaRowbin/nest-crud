import { Request,Controller, Get, Post, Body, Patch, Param, Delete ,UsePipes, ValidationPipe, ParseIntPipe ,UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import * as crypto from 'crypto';
import { AuthGuard } from 'src/middleware/auth.middleware';
import { LoginDto } from './dto/login-user.dto';


@Controller('user')
export class UserController {
  private generatedStrings: Set<string> = new Set();
  constructor(private readonly userService: UserService) {}

  @Post() 
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    
    return this.userService.create(createUserDto);

  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

 
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id:number){
  
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Request() req) {
    const token = req.headers.authorization.replace('Bearer ', ''); // Extract token from header
    console.log(token);
    this.userService.addToBlacklist(token);
    return { message: 'Logged out successfully' };
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }


  @Post('login')
  async login(@Body() loginDto:LoginDto){
    const user = await this.userService.login(loginDto);
 
    if (user) {
      // Authentication successful
      return { message: 'Login successful', user };
    } else {
      // Authentication failed
      return { message: 'Login failed', user: null };
  }
}
}
