import { BaseService } from '@/modules/base/base.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsuariosService extends BaseService {
  format(data: any) {
    delete data.pass
    delete data.token
    return data
  }

  parse(data: any) {
    return data
  }

  beforeSave(data: any) {
    return data
  }

  afterSave(saved: any) {
    delete saved.pass
    delete saved.token
    return saved
  }

  beforeDelete(data: any) {
    return data
  }

  afterDelete(deleted: any) {
    delete deleted.pass
    delete deleted.token
    return deleted
  }
}
