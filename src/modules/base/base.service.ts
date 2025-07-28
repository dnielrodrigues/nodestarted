import { Injectable } from '@nestjs/common'

@Injectable()
export class BaseService {
  getModel(model: string): { welcome: string } {
    return { welcome: model }
  }
}
