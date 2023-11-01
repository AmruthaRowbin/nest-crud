import { Userproduct } from 'src/userproduct/entities/userproduct.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @OneToMany(() => Userproduct, userProduct => userProduct.user) // The property name should be user, not userProducts
    userProducts: Userproduct[];
}
