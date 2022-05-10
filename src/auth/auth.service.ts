import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../services/user/user.service";
import bcrypt from "bcrypt";
import {ChangePasswordDto} from "../services/user/user.dto";
import {UserEntity} from "../database/entity/user.entity";
import {CustomException} from "../exception/custom.exception";
import {ErrorCode} from "../core/common/contants";
import {hash} from "../ultis/encrypt";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private jwtService: JwtService,
                @InjectRepository(UserEntity)
                private readonly userReposity: Repository<UserEntity>) {
    }

    async login(username: string, pass: string): Promise<any> {
        this.userService.find({username: username}).then(users => {
            if (users) {
                return this.isMatch(pass, users[0].passwordHash).then(result => {
                    if (!result) {
                        throw new UnauthorizedException();
                    }

                    const payload = {username: users[0].username, sub: users[0].id, roles: users[0].roles};
                    return {
                        access_token: this.jwtService.sign(payload),
                    };
                })
            } else {
                throw new UnauthorizedException();
            }
        });

    }

    isMatch(password, hash): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    changePassword(request: ChangePasswordDto): Promise<UserEntity> {
        return this.userReposity.findOne(request.userId).then(user => {
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
