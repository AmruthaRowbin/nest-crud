import { Userproduct } from 'src/userproduct/entities/userproduct.entity';
import { BeforeInsert,BaseEntity,Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';


@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    password:string;

    @BeforeInsert()
    async hashPassword(){
        this.password=await bcrypt.hash(this.password,8)
    }

    async validatePassword(password:string):Promise<boolean>
{
    return bcrypt.compare(password,this.password)
}
    @OneToMany(() => Userproduct, userProduct => userProduct.user) // The property name should be user, not userProducts
    userProducts: Userproduct[];
}
