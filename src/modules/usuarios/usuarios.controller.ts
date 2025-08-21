import { BaseController } from '@/modules/base/base.controller'
import { ErrorService } from '@/shared/error/error.service'
import { QueryParamsService } from '@/shared/query-params/query-params.service'
import { Controller } from '@nestjs/common'
import { UsuariosService } from './usuarios.service'

@Controller('usuarios')
export class UsuariosController extends BaseController {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    service: UsuariosService,
    query: QueryParamsService,
    errors: ErrorService
  ) {
    super(service, query, errors)
  }
}
