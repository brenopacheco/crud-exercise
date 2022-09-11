import { Injectable, NestMiddleware, Logger } from '@nestjs/common'

import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(LoggerMiddleware.name)
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl: url } = req

    res.on('close', () => {
      const { statusCode, statusMessage } = res
      this.logger.log(`${method} ${url} ${statusCode} ${statusMessage}`)
    })

    next()
  }
}
