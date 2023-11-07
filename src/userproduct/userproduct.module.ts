import { Module } from '@nestjs/common';
import { UserproductService } from './userproduct.service';
import { UserproductController } from './userproduct.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Products} from 'src/product/entities/product.entity';
import { Userproducts } from './entities/userproduct.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Products,Userproducts])],
  controllers: [UserproductController],
  providers: [UserproductService],
})
export class UserproductModule {}
