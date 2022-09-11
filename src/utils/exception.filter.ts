import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpStatus,
  HttpException,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { MissingEntityError, ValidationError } from './exceptions'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private logger = new Logger(GlobalExceptionFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.debug(
      `${(exception as Error).name}: ${(exception as Error).message}`
    )
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let errors: object | undefined = undefined
    let message: string | undefined = undefined

    if (exception instanceof MissingEntityError) {
      status = HttpStatus.NOT_FOUND
      message = exception.message
    }

    if (exception instanceof ValidationError) {
      status = HttpStatus.BAD_REQUEST
      errors = exception.errors
    }

    if (exception instanceof HttpException) status = exception.getStatus()

    response.status(status).json({
      status: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...(errors && { errors }),
      ...(message && { message }),
    })
  }
}
