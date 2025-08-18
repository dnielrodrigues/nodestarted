import { BaseController } from '@/modules/base/base.controller'
import { ErrorService } from '@/modules/error/error.service'
import { QueryParams } from '@/shared/QueryParams'
import { Controller } from '@nestjs/common'
import { UsuariosService } from './usuarios.service'

@Controller('usuarios')
export class UsuariosController extends BaseController {
  queryParams = new QueryParams()

  // eslint-disable-next-line no-useless-constructor
  constructor(service: UsuariosService, errors: ErrorService) {
    super(service, errors)
  }
}
