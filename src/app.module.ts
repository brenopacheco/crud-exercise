import { MiddlewareConsumer, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { MoviesModule } from './movies/movies.module'
import { LoggerMiddleware } from './utils/logger.middleware'

@Module({
  imports: [MoviesModule],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
