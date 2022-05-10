import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateCardTypeDto} from "./card-type.dto";
import {CustomException} from "../../exception/custom.exception";
import {ErrorCode} from "../../core/common/contants";
import {CardEntity} from "../../database/entity/card.entity";

@Injectable()
export class CardTypeService {
    constructor(
        @InjectRepository(CardEntity)
        private readonly cardReposity: Repository<CardEntity>,
    ) {
    }

    findOne(id: number): Promise<CardEntity> {
        return this.cardReposity.findOne(id);
    }

    findAll(): Promise<CardEntity[]> {
        return this.cardReposity.find();
    }

    create(request: CreateCardTypeDto): Promise<CardEntity> {
        this.cardReposity.findOne({
            where: {
                code: request.code
            }
        }).then(role => {
            if (role) {
                throw new CustomException("ROLE_EXIST", ErrorCode.ROLE_EXIST)
            }
        })

        return this.cardReposity.save(request);

    }

    update(id: number, request: CreateCardTypeDto): Promise<CardEntity> {
        return this.cardReposity.findOne(id).then(updatedCard => {
            if (!updatedCard) {
                throw new CustomException("CARD_TYPE_NOT_EXIST", ErrorCode.CARD_TYPE_NOT_EXIST)
            }

            this.cardReposity.findOne({
                where: {
                    code: request.code
                }
            }).then(card => {
                if (card) {
                    throw new CustomException("CARD_TYPE_EXIST", ErrorCode.CARD_TYPE_EXIST)
                }
            })

            updatedCard.name = request.name ? request.name : updatedCard.name;
            return this.cardReposity.save(updatedCard);
        })

    }

    delete(id: number): Promise<CardEntity> {
        return this.cardReposity.findOne(id).then(role => {
            if (!role) {
                throw new CustomException("CARD_TYPE_NOT_EXIST", ErrorCode.CARD_TYPE_NOT_EXIST)
            }

            return this.cardReposity.delete(id).then(() => {
                return role;
            });
        })
    }

}
