
import { IsInt } from 'class-validator';

export class CreateUserproductDto {
    @IsInt()
    userId: number;
  
    @IsInt()
    productId: number;
}
