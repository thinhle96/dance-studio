import {Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CardTypeService} from "./card-type.service";
import {CreateCardTypeDto} from "./card-type.dto";
import {ApiTags} from "@nestjs/swagger";


@Controller('card')
@ApiTags('card')
export class CardController {


    constructor(private readonly cardService: CardTypeService) {
    }

    @Get('')
    async findAll() {
        return this.cardService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.cardService.findOne(id);
    }

    @Post('')
    async create(request: CreateCardTypeDto) {
        return await this.cardService.create(request);
    }

    @Put(':id')
    async update(@Param('id') id: number, request: CreateCardTypeDto) {
        return await this.cardService.update(id, request);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.cardService.delete(id);
    }
}
