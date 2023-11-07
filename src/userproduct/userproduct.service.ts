import { Injectable } from '@nestjs/common';
import { CreateUserproductDto } from './dto/create-userproduct.dto';
import { UpdateUserproductDto } from './dto/update-userproduct.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Userproducts } from './entities/userproduct.entity';
import {Repository} from 'typeorm'
import { Products } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserproductService {
 constructor(
  @InjectRepository(Userproducts) private userProductRepository: Repository<Userproducts>,
  @InjectRepository(User) private userRepository: Repository<User>, 
    @InjectRepository(Products) private productRepository: Repository<Products>
){}


async create(createUserproductDto: CreateUserproductDto): Promise<Userproducts> {
  
  const user = await this.userRepository.findOne({
    where: { id: createUserproductDto.userId }
  });
  const product = await this.productRepository.findOne({
    where: { id: createUserproductDto.productId }
  });

 
  const userproduct = new Userproducts();
  userproduct.user = user; 
  userproduct.product = product; 


  return this.userProductRepository.save(userproduct);
}

 async getUsersWithProducts(): Promise<Userproducts[]> {
  // return this.userProductRepository.query('SELECT * FROM userproduct as up LEFT JOIN user on up.userId=user.id Left Join product as p on up.productId=p.id'); 
  return this.userProductRepository.find({ relations: ['user','product'] });    
}
 
}
