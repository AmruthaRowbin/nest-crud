import { Injectable } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { tokenGenerator } from 'src/helper/token';
import { EntityManager } from 'typeorm';
import { LoginDto } from 'src/user/dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()

export class LoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager
  ) { }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const query = `SELECT * FROM user WHERE email = '${email}'`;
    const result = await this.entityManager.query(query);

    if (result.length > 0) {
      const user = result[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = await tokenGenerator(this.entityManager);
        const updateQuery = `UPDATE user SET token = '${token}' WHERE id = '${user.id}'`;
        await this.entityManager.query(updateQuery);
        return await this.getUser(user.id);
      }
    }
    return null;
  }

  async getUser(id: number) {
    const user = await User.findOne({
      where: {
        id: id
      }
    });

    const data = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token: user.token
    }
    return data;
  }
}