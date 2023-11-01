import { Injectable } from '@nestjs/common';
import { CreateUserproductDto } from './dto/create-userproduct.dto';
import { UpdateUserproductDto } from './dto/update-userproduct.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Userproduct } from './entities/userproduct.entity';
import {Repository} from 'typeorm'
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserproductService {
 constructor(
  @InjectRepository(Userproduct) private userProductRepository: Repository<Userproduct>,
  @InjectRepository(User) private userRepository: Repository<User>, 
    @InjectRepository(Product) private productRepository: Repository<Product>
){}


async create(createUserproductDto: CreateUserproductDto): Promise<Userproduct> {
  
  const user = await this.userRepository.findOne({
    where: { id: createUserproductDto.userId }
  });
  const product = await this.productRepository.findOne({
    where: { id: createUserproductDto.productId }
  });

 
  const userproduct = new Userproduct();
  userproduct.user = user; 
  userproduct.product = product; 


  return this.userProductRepository.save(userproduct);
}

 async getUsersWithProducts(): Promise<Userproduct[]> {
  // return this.userProductRepository.query('SELECT * FROM userproduct as up LEFT JOIN user on up.userId=user.id Left Join product as p on up.productId=p.id'); 
  return this.userProductRepository.find({ relations: ['user','product'] });    
}
 
}
