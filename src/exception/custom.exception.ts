import {HttpException, HttpStatus} from "@nestjs/common";
import {ErrorCode} from "../core/common/contants";


export class CustomException extends HttpException {
    message: string;
    errorCode: string;

    constructor(errorCode: string, message: ErrorCode) {
        super("BAD_REQUEST", HttpStatus.BAD_REQUEST);
        this.message = message;
        this.errorCode = errorCode;
    }
}

