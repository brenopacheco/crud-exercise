import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import * as request from 'supertest'

describe('AppController', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  describe('root', () => {
    it('should redirect to swagger api docs', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(302)
        .expect('Location', 'api')
    })
  })
})
