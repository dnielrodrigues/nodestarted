import { getModel } from '@/shared/Database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseService {
  model: string
  errorModel = { error: 'invalid_param', param: 'model' }

  // readers
  async get(opt: any) {
    const model = getModel(this.model)
    return await model.findUnique(opt)
  }

  async list(opt?: object) {
    const model = getModel(this.model)
    return await model.findMany(opt)
  }

  // actions
  save(obj: any) {
    if (!this.model) throw this.errorModel
    return { model: this.model, obj }
  }

  delete(id: string) {
    return { model: this.model, id }
  }

  // events
  beforeSave(obj: any) {
    return obj
  }

  afterSave(obj: any) {
    return obj
  }

  beforeDelete(obj: any) {
    return obj
  }

  afterDelete(obj: any) {
    return obj
  }

  // getters/setters
  setModel(str) {
    if (str) this.model = str
  }
}
