import { LogLevel, RequestMethod, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import config from './utils/config'
import { GlobalExceptionFilter } from './utils/exception.filter'

const levels: { [K in typeof config.ENV]: LogLevel[] } = {
  dev: ['error', 'warn', 'log', 'debug', 'verbose'],
  staging: ['error', 'warn', 'log'],
  prod: ['error', 'warn'],
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: levels[config.ENV],
  })

  app.setGlobalPrefix('v1', {
    exclude: [
      { path: '/', method: RequestMethod.GET },
      { path: 'health', method: RequestMethod.GET },
      { path: 'ready', method: RequestMethod.GET },
    ],
  })

  const openapi = new DocumentBuilder()
    .setTitle('Brightcove OTT API 1.0.0')
    .setDescription('Reference for the Brightcove OTT API - Test example')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, openapi)
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  )

  app.useGlobalFilters(new GlobalExceptionFilter())

  await app.listen(config.PORT)
}
bootstrap()
