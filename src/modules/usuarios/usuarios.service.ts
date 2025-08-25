import { BaseService } from '@/modules/base/base.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsuariosService extends BaseService {
  model = 'usuarios'

  // accessors
  format(data: any) {
    delete data.pass
    delete data.token
    return data
  }

  parse(data: any) {
    return data
  }

  // just inner use
  async findByEmail(email: string) {
    const model = this.db.getModel('usuarios')
    return await model.findUnique({ where: { email } })
  }
}
