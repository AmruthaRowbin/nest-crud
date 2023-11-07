import { Userproducts } from 'src/userproduct/entities/userproduct.entity';
import {Entity ,Column,PrimaryGeneratedColumn,OneToMany} from'typeorm' 

@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    productname:string;
    @Column()
    productqty:number;
    @Column()
    productprice:number;
    @OneToMany(() => Userproducts, userProduct => userProduct.product)
    userProducts: Userproducts[];
    
}
