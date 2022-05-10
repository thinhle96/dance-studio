import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {CardTypeEntity} from './card-type.entity';
import {UserEntity} from './user.entity';

@Entity('card')
export class CardEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne((type) => CardTypeEntity, (cardType) => cardType.card)
    cardType: CardTypeEntity;

    @ManyToOne((type) => UserEntity, (user) => user.cards)
    customer: UserEntity;
}
