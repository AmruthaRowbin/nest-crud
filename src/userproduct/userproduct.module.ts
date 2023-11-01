import { Module } from '@nestjs/common';
import { UserproductService } from './userproduct.service';
import { UserproductController } from './userproduct.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { Userproduct } from './entities/userproduct.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Product,Userproduct])],
  controllers: [UserproductController],
  providers: [UserproductService],
})
export class UserproductModule {}
