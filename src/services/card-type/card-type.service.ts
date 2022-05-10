import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateCardTypeDto} from "./card-type.dto";
import {CustomException} from "../../exception/custom.exception";
import {ErrorCode} from "../../core/common/contants";
import {CardTypeEntity} from "../../database/entity/card-type.entity";

@Injectable()
export class CardTypeService {
    constructor(
        @InjectRepository(CardTypeEntity)
        private readonly cardTypeReposity: Repository<CardTypeEntity>,
    ) {
    }

    findOne(id: number): Promise<CardTypeEntity> {
        return this.cardTypeReposity.findOne(id);
    }

    findAll(): Promise<CardTypeEntity[]> {
        return this.cardTypeReposity.find();
    }

    create(request: CreateCardTypeDto): Promise<CardTypeEntity> {
        this.cardTypeReposity.findOne({
            where: {
                code: request.code
            }
        }).then(role => {
            if (role) {
                throw new CustomException("ROLE_EXIST", ErrorCode.ROLE_EXIST)
            }
        })

        return this.cardTypeReposity.save(request);

    }

    update(id: number, request: CreateCardTypeDto): Promise<CardTypeEntity> {
        return this.cardTypeReposity.findOne(id).then(updatedType => {
            if (!updatedType) {
                throw new CustomException("CARD_TYPE_NOT_EXIST", ErrorCode.CARD_TYPE_NOT_EXIST)
            }

            this.cardTypeReposity.findOne({
                where: {
                    code: request.code
                }
            }).then(type => {
                if (type) {
                    throw new CustomException("CARD_TYPE_EXIST", ErrorCode.CARD_TYPE_EXIST)
                }
            })
            updatedType.code = request.code ? request.code : updatedType.code;
            updatedType.name = request.name ? request.name : updatedType.name;
            return this.cardTypeReposity.save(updatedType);
        })

    }

    delete(id: number): Promise<CardTypeEntity> {
        return this.cardTypeReposity.findOne(id).then(role => {
            if (!role) {
                throw new CustomException("CARD_TYPE_NOT_EXIST", ErrorCode.CARD_TYPE_NOT_EXIST)
            }

            return this.cardTypeReposity.delete(id).then(() => {
                return role;
            });
        })
    }

}
