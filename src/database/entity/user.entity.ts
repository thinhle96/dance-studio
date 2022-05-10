import {Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {CardEntity} from './card.entity';
import {RoleEntity} from './role.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    username: string;

    @Column()
    passwordHash: string;

    @Column()
    mobile: string;

    @Column()
    fullName: string;

    @Column()
    email: string;

    @ManyToMany(() => RoleEntity)
    @JoinColumn()
    roles: RoleEntity[];

    @OneToMany(() => CardEntity, (card) => card.customer)
    cards: CardEntity[];
}
