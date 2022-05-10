import {Module} from '@nestjs/common';
import {CardTypeService} from './card-type.service';
import {CardTypeController} from './card-type.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CardTypeEntity} from "../../database/entity/card-type.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CardTypeEntity])],
    providers: [CardTypeService],
    controllers: [CardTypeController],
})
export class CardTypeModule {
}
