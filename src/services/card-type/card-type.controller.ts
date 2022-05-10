import {Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CardTypeService} from "./card-type.service";
import {CreateCardTypeDto} from "./card-type.dto";
import {ApiTags} from "@nestjs/swagger";


@Controller('card-type')
@ApiTags('card-type')
export class CardTypeController {


    constructor(private readonly cardTypeService: CardTypeService) {
    }

    @Get('')
    async findAll() {
        return this.cardTypeService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.cardTypeService.findOne(id);
    }

    @Post('')
    async create(request: CreateCardTypeDto) {
        return await this.cardTypeService.create(request);
    }

    @Put(':id')
    async update(@Param('id') id: number, request: CreateCardTypeDto) {
        return await this.cardTypeService.update(id, request);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.cardTypeService.delete(id);
    }
}
