import { Controller, Get, Redirect } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'

@Controller()
@ApiExcludeController()
export class AppController {
  @Get()
  @Redirect('api')
  api() {}

  @Get(['/health', '/ready'])
  health(): string {
    return 'OK'
    // TODO: check db conn.
  }
}
