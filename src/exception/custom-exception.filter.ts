import {ArgumentsHost, Catch, ExceptionFilter} from '@nestjs/common';
import {Request, Response} from 'express';
import {CustomException} from "./custom.exception";

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: CustomException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                result: null,
                message: exception.message,
                responseCode: status,
                path: request.url,
            });
    }
}