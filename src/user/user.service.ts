import { Injectable,ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'

import { EntityManager } from 'typeorm';



@Injectable()
export class UserService {
  private readonly blacklist: string[] = [];

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager
  ) { }
  async create(createUserDto: Partial<User>): Promise<User> {

    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
  
       throw new ConflictException('A user with the same email already exists');
      
    }

    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);

  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async addToBlacklist(token: string) {
    this.blacklist.push(token);
  }

  isTokenBlacklisted(token: string): boolean {
    return this.blacklist.includes(token);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }



  async findByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email
      }
    })
  }
}
