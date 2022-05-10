import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';
import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T> {
  /**
   * Response content
   */

  @ApiProperty()
  result: T;

  /**
   * Error code. Null if responseCode indicates success.
   */
  @ApiProperty()
  errorCode: string;

  /**
   * "OK" if response is successful. Otherwise contains error details.
   */
  @ApiProperty()
  message: any;

  /**
   * 200 on success, 400 (or other codes) on error.
   */
  @ApiProperty()
  responseCode: number;

  constructor(
    result: T,
    errorCode: string,
    message: any,
    responseCode: number,
  ) {
    this.result = result;
    this.errorCode = errorCode;
    this.message = message;
    this.responseCode = responseCode;
  }

  public static successWithResult<T>(result: T): ApiResponse<T> {
    return new ApiResponse<T>(
      result,
      null,
      HttpStatus[HttpStatus.OK],
      HttpStatus.OK.valueOf(),
    );
  }

  public static failureWithCode<T>(
    message: any,
    erorrCode: any,
  ): ApiResponse<any> {
    return new ApiResponse(
      null,
      erorrCode,
      message,
      HttpStatus.BAD_REQUEST.valueOf(),
    );
  }
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    console.log(next.handle());
    return next.handle().pipe(
      map((data: T) => {
        return ApiResponse.successWithResult(data);
      }),
      catchError((err) =>
        of(
          ApiResponse.failureWithCode(
            err.message != undefined
              ? err.message
              : err.response.data.errors[0].defaultUserMessage,
            err.errorCode ? err.errorCode : 'BAD_REQUEST',
          ),
        ),
      ),
    );
  }
}
