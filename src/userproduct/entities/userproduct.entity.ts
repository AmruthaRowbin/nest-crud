import { Products } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn,JoinColumn } from 'typeorm'

@Entity()
export class Userproducts {
    @PrimaryGeneratedColumn()
    id: number;
 

    @ManyToOne(() => User, user => user.userProducts)
    @JoinColumn({name:'userId'})
    user: User;

    @ManyToOne(() => Products, product => product.userProducts)
    @JoinColumn({name:"productId"})
    product: Products
}


