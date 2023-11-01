import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn,JoinColumn } from 'typeorm'

@Entity()
export class Userproduct {
    @PrimaryGeneratedColumn()
    id: number;
 

    @ManyToOne(() => User, user => user.userProducts)
    @JoinColumn({name:'userId'})
    user: User;

    @ManyToOne(() => Product, product => product.userProducts)
    @JoinColumn({name:"productId"})
    product: Product
}


