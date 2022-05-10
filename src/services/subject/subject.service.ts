import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CustomException} from "../../exception/custom.exception";
import {ErrorCode} from "../../core/common/contants";
import {SubjectEntity} from "../../database/entity/subject.entity";
import {CreateSubjectDto} from "./subject.dto";

@Injectable()
export class SubjectService {
    constructor(
        @InjectRepository(SubjectEntity)
        private readonly subjectReposity: Repository<SubjectEntity>,
    ) {
    }

    findOne(id: number): Promise<SubjectEntity> {
        return this.subjectReposity.findOne(id);
    }

    findAll(): Promise<SubjectEntity[]> {
        return this.subjectReposity.find();
    }

    create(request: CreateSubjectDto): Promise<SubjectEntity> {
        return this.subjectReposity.findOne({
            where: {
                code: request.code
            }
        }).then(role => {
            if (role) {
                throw new CustomException("ROLE_EXIST", ErrorCode.ROLE_EXIST)
            }
            return this.subjectReposity.save(request);

        })


    }

    update(id: number, request: CreateSubjectDto): Promise<SubjectEntity> {
        return this.subjectReposity.findOne(id).then(updatedSubject => {
            if (!updatedSubject) {
                throw new CustomException("SUBJECT_NOT_EXIST", ErrorCode.SUBJECT_NOT_EXIST)
            }

            this.subjectReposity.findOne({
                where: {
                    code: request.code
                }
            }).then(subject => {
                if (subject) {
                    throw new CustomException("SUBJECT_EXIST", ErrorCode.SUBJECT_EXIST)
                }
            })
            updatedSubject.code = request.code ? request.code : updatedSubject.code;
            updatedSubject.name = request.name ? request.name : updatedSubject.name;
            return this.subjectReposity.save(updatedSubject);
        })

    }

    delete(id: number): Promise<SubjectEntity> {
        return this.subjectReposity.findOne(id).then(subject => {
            if (!subject) {
                throw new CustomException("ROLE_NOT_EXIST", ErrorCode.ROLE_EXIST)
            }

            return this.subjectReposity.delete(id).then(() => {
                return subject;
            });
        })
    }

}
