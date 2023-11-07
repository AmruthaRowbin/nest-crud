import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import {Repository} from 'typeorm'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository:Repository<Products>
  ){}
  create(createProductDto: Partial<Products>): Promise<Products> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
   
  }
  

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOneBy({id});
  }

  update(id: number, updateProductDto: Partial<Products>) {
    return this.productRepository.update(id,updateProductDto);
  }

 remove(id:number){
  console.log('deletd!!!!!')
  return this.productRepository.delete(id)

 }

  
}

