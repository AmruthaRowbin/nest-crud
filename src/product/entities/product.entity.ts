import { Userproduct } from 'src/userproduct/entities/userproduct.entity';
import {Entity ,Column,PrimaryGeneratedColumn,OneToMany} from'typeorm' 

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    productname:string;
    @Column()
    productqty:number;
    @Column()
    productprice:number;

    @OneToMany(()=> Userproduct, userProduct=>userProduct.product)
    userProducts:Userproduct[];
    
}
