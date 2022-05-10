import {Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto, UpdateUserDto} from "./user.dto";
import {ApiTags} from "@nestjs/swagger";

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get('')
    async findAll(@Query() query) {
        return this.userService.find(query)
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.userService.findOne(id);
    }

    @Post('')
    async create(request: CreateUserDto) {
        return await this.userService.create(request);
    }

    @Put(':id')
    async update(@Param('id') id: number, request: UpdateUserDto) {
        return await this.userService.update(id, request);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.userService.delete(id);
    }
}
