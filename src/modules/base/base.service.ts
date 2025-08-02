import { Injectable } from '@nestjs/common'

@Injectable()
export class BaseService {
  model?: string

  // readers
  get(id: string) {
    return { model: this.model, id }
  }

  list(opt?: object) {
    return { model: this.model, opt }
  }

  // actions
  save(obj: any) {
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
