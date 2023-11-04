import { Controller, Get, Post,Body} from '@nestjs/common';
import { UserproductService } from './userproduct.service';
import { CreateUserproductDto } from './dto/create-userproduct.dto';
import { UpdateUserproductDto } from './dto/update-userproduct.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('userproduct')
export class UserproductController {
  constructor(private readonly userproductService: UserproductService) {}


  @Post()
  async create(@Body() createUserproductDto: CreateUserproductDto) {
    const userproduct = await this.userproductService.create(createUserproductDto);
    
    return userproduct;
  }

@Get()
async getUsersWithProducts() {
  return this.userproductService.getUsersWithProducts();
}


  


}
