import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {CardEntity} from './card.entity';

@Entity('card-type')
export class CardTypeEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;

    @OneToMany((type) => CardEntity, (card) => card.cardType)
    card: CardEntity[];
}
