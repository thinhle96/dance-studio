import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('subject')
export class SubjectEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;
}
