import { Test, TestingModule } from '@nestjs/testing'
import { MoviesController } from './movies.controller'
import { PrismaService } from '../utils/prisma.service'
import { MoviesService } from './movies.service'

describe('MoviesController', () => {
  let controller: MoviesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService, PrismaService]
    }).compile()

    controller = module.get<MoviesController>(MoviesController)
  })

  it('should be defined', () => {
    // TODO: mock prisma & test CRUD
    expect(controller).toBeDefined()
  })
})
