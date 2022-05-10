import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {UserEntity} from '../../database/entity/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {ChangePasswordDto, CreateUserDto, UpdateUserDto} from "./user.dto";
import {hash} from "../../ultis/encrypt";
import {CustomException} from "../../exception/custom.exception";
import {ErrorCode} from "../../core/common/contants";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userReposity: Repository<UserEntity>,
    ) {
    }

    findOne(id: number): Promise<UserEntity> {
        return this.userReposity.findOne(id)
    }

    find(query): Promise<UserEntity[]> {
        return this.userReposity.find({where: {query}}
        );
    }

    create(request: CreateUserDto): Promise<UserEntity> {
        if (request.password !== request.repeatPassword) {
            throw new CustomException("REPEAT_PASSWORD_NOT_VALID", ErrorCode.REPEAT_PASSWORD_NOT_VALID)
        }
        return hash(request.password).then(passHash => {
            let user = {
                username: request.username,
                passwordHash: passHash,
                fullName: request.username,
                mobile: request.mobile,
                email: request.username,
            }
            return this.userReposity.save(user);

        })

    }

    update(id: number, request: UpdateUserDto): Promise<UserEntity> {
        return this.userReposity.findOne(id).then(user => {
            if (!user) {
                throw new CustomException('USER_NOT_EXIST', ErrorCode.USER_NOT_EXIST)
            }

            user.mobile = request.mobile ? request.mobile : user.mobile;
            user.email = request.email ? request.email : user.email;
            user.fullName = request.name ? request.name : user.fullName;

            return this.userReposity.save(user);
        })

    }

    delete(id: number): Promise<UserEntity> {
        return this.userReposity.findOne(id).then(user => {
            if (!user) {
                throw new CustomException("USER_NOT_EXIST", ErrorCode.USER_NOT_EXIST)
            }

            return this.userReposity.delete(id).then(r => {
                return user;
            });
        })
    }

    changePassword(id: number, request: ChangePasswordDto): Promise<UserEntity> {
        return this.userReposity.findOne(id).then(user => {
            if (!user) {
                throw new CustomException("USER_NOT_EXIST", ErrorCode.USER_NOT_EXIST)
            }

            if (request.password !== request.repeatPassword) {
                throw new CustomException("REPEAT_PASSWORD_NOT_VALID", ErrorCode.REPEAT_PASSWORD_NOT_VALID)
            }

            return hash(request.password).then(passHash => {
                user.passwordHash = passHash;
                return this.userReposity.save(user);
            })
        })
    }

}
