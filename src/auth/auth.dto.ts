export class LoginDto {
    username: string;
    password: string;
}

export class ChangePasswordDto {
    userId: number;
    password: string;
    repeatPassword: string;
}
