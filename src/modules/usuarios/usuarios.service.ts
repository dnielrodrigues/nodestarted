import { BaseService } from '@/modules/base/base.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsuariosService extends BaseService {
  beforeSave(data: any) {
    return data
  }

  afterSave(saved: any) {
    return saved
  }

  beforeDelete(data: any) {
    return data
  }

  afterDelete(deleted: any) {
    return deleted
  }
}
