import { Module } from '@nestjs/common'
import { PrismaService } from '../utils/prisma.service'
import { MoviesController } from './movies.controller'
import { MoviesService } from './movies.service'

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, PrismaService],
  exports: [MoviesService],
})
export class MoviesModule {}
