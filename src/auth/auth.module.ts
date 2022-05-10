import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserModule} from "../services/user/user.module";
import {AuthController} from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../database/entity/user.entity";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: process.env.JWT_EXP},
        }),
        TypeOrmModule.forFeature([UserEntity])
    ],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {
}
