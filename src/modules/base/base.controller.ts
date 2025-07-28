import { Controller, Get, Param } from '@nestjs/common'
import { BaseService } from './base.service'

@Controller(':slug')
export class BaseController {
  constructor(private readonly baseService: BaseService) {}

  @Get()
  getModel(@Param('slug') slug: string): { welcome: string } {
    return this.baseService.getModel(slug)
  }
}
