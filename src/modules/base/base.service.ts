import { DatabaseService } from '@/shared/database/database.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class BaseService {
  model: string
  errorModel = { error: 'invalid_param', param: 'model' }

  constructor(private readonly db: DatabaseService) {}

  // readers
  async get(opt: any) {
    const model = this.db.getModel(this.model)
    return await model.findUnique(opt)
  }

  async list(opt?: object) {
    const model = this.db.getModel(this.model)
    return await model.findMany(opt)
  }

  // actions
  async save(obj: any, forceCreate = false) {
    const model = this.db.getModel(this.model)
    const data = this.beforeSave(obj)
    let saved: any = null
    if (!data.id || forceCreate) saved = await model.create({ data })
    else
      saved = await model.update({
        where: { id: data.id },
        data
      })
    return this.afterSave(saved)
  }

  delete(id: string) {
    return { model: this.model, id }
  }

  // events
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

  // getters/setters
  setModel(str) {
    if (str) this.model = str
  }
}
