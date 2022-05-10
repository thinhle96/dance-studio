import {Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {RoleService} from "./role.service";
import {CreateRoleDto} from "./role.dto";
import {ApiTags} from "@nestjs/swagger";

@Controller('role')
@ApiTags('role')
export class RoleController {


    constructor(private readonly roleService: RoleService) {
    }

    @Get('')
    async findAll() {
        return this.roleService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.roleService.findOne(id);
    }

    @Post('')
    async create(request: CreateRoleDto) {
        return await this.roleService.create(request);
    }

    @Put(':id')
    async update(@Param('id') id: number, request: CreateRoleDto) {
        return await this.roleService.update(id, request);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.roleService.delete(id);
    }
}
