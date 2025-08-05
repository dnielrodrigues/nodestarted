// import { Database } from '@/shared/Database'
import { getModel } from '@/shared/Database'
import { Injectable } from '@nestjs/common'

@Injectable()
export class BaseService {
  model?: string
  errorModel = { error: 'invalid_param', param: 'model' }

  // constructor(private readonly db: Database) {}

  // readers
  get(id: string) {
    return { model: this.model, id }
  }

  async list(opt?: object) {
    if (!this.model) throw this.errorModel
    const model = getModel(this.model)
    console.log(opt)
    return await model.findMany()
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
