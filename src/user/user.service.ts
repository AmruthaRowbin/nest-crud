import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from './entities/user.entity'
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm'
import { tokenGenerator } from 'src/helper/token';
import { EntityManager } from 'typeorm';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService {
  private readonly blacklist: string[] = [];
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    private readonly entityManager: EntityManager
  ){}
  async create(createUserDto: Partial<User>) : Promise<User> {
   
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);

  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({id});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id,updateUserDto);
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


  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    console.log(email, "AAAAAAAAAAAAAAAAAAAaaaa");
  
    const query = `SELECT * FROM user WHERE email = '${email}'`;
    const result = await this.entityManager.query(query);
    console.log(result, "RESULTWWWWWWWWWWWW");
  
    if (result.length === 1) {
      const user = result[0];
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        if (!user.token) {
          const token = await tokenGenerator(this.entityManager);
          
   
          const updateQuery = `UPDATE user SET token = ? WHERE id = ?`;
          await this.entityManager.query(updateQuery, [token, user.id]);
          
          return { user, token };
        } else {
     
          return { user, token: user.token };
        }
      }
    }
    return null; 
  }
  
  async findByEmail(email:string){
    return await User.findOne({
      where:{
        email:email
      }
    })
  }
}
