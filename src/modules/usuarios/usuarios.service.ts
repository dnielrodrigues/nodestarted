/* eslint-disable camelcase */
import { BaseService } from '@/modules/base/base.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsuariosService extends BaseService {
  model = 'usuarios'

  // accessors
  format(data: any) {
    delete data.pass
    delete data.token
    if (data.permissoes)
      data.aplicativos = this.getAppsByPermissoes(data.permissoes)
    return data
  }

  parse(data: any) {
    // const hashedPassword = await bcrypt.hash(data.password || 'secret', 10)
    // if (data.password) data.password = hashedPassword
    return data
  }

  // JUST to inner use
  async findByEmail(
    email: string,
    opt = {
      include: {
        permissoes: {
          include: { aplicativos: true, entidades: true, acoes: true }
        }
      }
    }
  ) {
    const model = this.db.getModel('usuarios')
    const user = await model.findUnique({ where: { email }, ...opt })
    user.aplicativos = await this.getAppsByUserId(user.id)
    return user
  }

  // get apps with entidades without actions
  async getAppsByUserId(usuario_id: string) {
    const model = this.db.getModel('permissoes')
    const permissions = await model.findMany({
      where: { usuario_id },
      include: { aplicativos: true, entidades: true, acoes: true }
    })
    return this.getAppsByPermissoes(permissions)
  }

  // get apps with entidades by a permissions list
  getAppsByPermissoes(arr: any[]) {
    const apps = arr.reduce((acc, permission) => {
      const aplicativo = permission.aplicativos
      const entidade = permission.entidades
      const slug = aplicativo.slug
      const entidadeExists = acc[slug]
        ? acc[slug].entidades.some(
            (entidade) => entidade.id === permission.entidade_id
          )
        : false
      if (!acc[slug]) acc[slug] = { ...aplicativo, entidades: [] }
      if (!entidadeExists) {
        acc[slug].entidades.push(permission.entidades)
      }
      return acc
    }, {})
    return apps
  }
}
