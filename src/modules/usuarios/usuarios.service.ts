import { BaseService } from '@/modules/base/base.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsuariosService extends BaseService {
  model = 'usuarios'

  format(data: any) {
    delete data.pass
    delete data.token
    return data
  }

  parse(data: any) {
    return data
  }
}
