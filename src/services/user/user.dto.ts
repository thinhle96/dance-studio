export class CreateUserDto {
    username: string;
    password: string;
    repeatPassword: string;
    name: string;
    mobile: string;
    email: string;
}

export class UpdateUserDto {
    name: string;
    mobile: string;
    email: string;
}

export class ChangePasswordDto {
    userId: number;
    password: string;
    repeatPassword: string;
}
