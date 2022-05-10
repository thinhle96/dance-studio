import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateRoleDto} from "./role.dto";
import {CustomException} from "../../exception/custom.exception";
import {ErrorCode} from "../../core/common/contants";
import {RoleEntity} from "../../database/entity/role.entity";

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleReposity: Repository<RoleEntity>,
    ) {
    }

    findOne(id: number): Promise<RoleEntity> {
        return this.roleReposity.findOne(id);
    }

    findAll(): Promise<RoleEntity[]> {
        return this.roleReposity.find();
    }

    create(request: CreateRoleDto): Promise<RoleEntity> {
        this.roleReposity.findOne({
            where: {
                code: request.code
            }
        }).then(role => {
            if (role) {
                throw new CustomException("ROLE_EXIST", ErrorCode.ROLE_EXIST)
            }
        })

        return this.roleReposity.save(request);

    }

    update(id: number, request: CreateRoleDto): Promise<RoleEntity> {
        return this.roleReposity.findOne(id).then(updatedRole => {
            if (!updatedRole) {
                throw new CustomException("ROLE_NOT_EXIST", ErrorCode.ROLE_NOT_EXIST)
            }

            this.roleReposity.findOne({
                where: {
                    code: request.code
                }
            }).then(role => {
                if (role) {
                    throw new CustomException("ROLE_EXIST", ErrorCode.ROLE_EXIST)
                }
            })
            updatedRole.code = request.code ? request.code : updatedRole.code;
            updatedRole.name = request.name ? request.name : updatedRole.name;
            return this.roleReposity.save(updatedRole);
        })

    }

    delete(id: number): Promise<RoleEntity> {
        return this.roleReposity.findOne(id).then(role => {
            if (!role) {
                throw new CustomException("ROLE_NOT_EXIST", ErrorCode.ROLE_EXIST)
            }

            return this.roleReposity.delete(id).then(() => {
                return role;
            });
        })
    }

}
