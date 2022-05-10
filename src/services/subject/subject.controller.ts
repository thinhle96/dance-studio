import {Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {SubjectService} from "./subject.service";
import {CreateSubjectDto} from "./subject.dto";
import {ApiTags} from "@nestjs/swagger";

@Controller('subject')
@ApiTags('subject')
export class SubjectController {


    constructor(private readonly subjectService: SubjectService) {
    }

    @Get('')
    async findAll() {
        return this.subjectService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.subjectService.findOne(id);
    }

    @Post('')
    async create(request: CreateSubjectDto) {
        return await this.subjectService.create(request);
    }

    @Put(':id')
    async update(@Param('id') id: number, request: CreateSubjectDto) {
        return await this.subjectService.update(id, request);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.subjectService.delete(id);
    }
}
