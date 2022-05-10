import {Controller, Post, UseGuards} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {ChangePasswordDto} from "../services/user/user.dto";
import {LoginDto} from "./auth.dto";
import {LocalAuthGuard} from "../guard/local-auth.guard";

@Controller('auth')
@ApiTags('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(request: LoginDto) {
        return await this.authService.login(request.username, request.password);
    }

    @Post('change-pass')
    async changePass(request: ChangePasswordDto) {
        return await this.authService.changePassword(request);
    }
}
