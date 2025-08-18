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
    const result = await model.findUnique(opt)
    if (result) return this.format(result)
    else throw { error: 'not_founded' }
  }

  async list(opt?: object) {
    const model = this.db.getModel(this.model)
    const result = await model.findMany(opt)
    if (Array.isArray(result)) {
      return result.map((obj) => this.format(obj))
    } else throw { error: 'not_founded' }
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

  async delete(id: string) {
    const model = this.db.getModel(this.model)
    const result = await model.delete({ where: { id } })
    if (result) return this.format(result)
    else throw { error: 'not_founded' }
  }

  // input/output
  format(data: any) {
    return data
  }

  parse(data: any) {
    return data
  }

  // events
  beforeSave(data: any) {
    return this.parse(data)
  }

  afterSave(saved: any) {
    return this.format(saved)
  }

  beforeDelete(data: any) {
    return this.parse(data)
  }

  afterDelete(deleted: any) {
    return this.format(deleted)
  }

  // getters/setters
  setModel(str) {
    if (str) this.model = str
  }
}
