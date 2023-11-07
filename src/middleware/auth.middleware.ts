import { Injectable, CanActivate, ExecutionContext,Request } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly entityManager: EntityManager) {
    
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    const token = authHeader.split(' ')[1]; 

    const user = await this.getUserByToken(token);

    if (!user) {
      return false; 
    }

    request.user = user;
    console.log(user,'!!!!!!!!!!!!!!!!!!!')
    return true;
  }

  async getUserByToken(token: string) {
    const query = `SELECT * FROM user WHERE token = '${token}'`; 
    const result = await this.entityManager.query(query);
    return result[0]; 
  }
}
