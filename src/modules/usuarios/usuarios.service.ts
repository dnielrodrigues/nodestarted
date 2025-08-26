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
    // const hashedPassword = await bcrypt.hash(data.password || 'secret', 10)
    // if (data.password) data.password = hashedPassword
    return data
  }

  // just inner use
  async findByEmail(
    email: string,
    opt = { include: { permissoes: { include: { acoes: true } } } }
  ) {
    const model = this.db.getModel('usuarios')
    return await model.findUnique({ where: { email }, ...opt })
  }
}
