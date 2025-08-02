import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { BaseService } from './base.service'

@Controller(':model')
export class BaseController {
  constructor(private readonly baseService: BaseService) {}

  @Get()
  list(@Param('model') model: string): any {
    // TODO - middleware
    try {
      this.baseService.setModel(model)
      return this.baseService.list()
    } catch (error) {
      return error.name
    }
  }

  @Get(':id')
  get(@Param() { model, id }: { model: string; id: string }): any {
    // TODO - middleware
    try {
      this.baseService.setModel(model)
      return this.baseService.get(id)
    } catch (error) {
      return error.name
    }
  }

  @Post()
  create(@Param('model') model: string, @Body() body: any) {
    // TODO - middleware
    try {
      this.baseService.setModel(model)
      return this.baseService.save(body)
    } catch (error) {
      return error.name
    }
  }

  @Put(':id')
  update(
    @Param() { model, id }: { model: string; id: string },
    @Body() body: any
  ): any {
    // TODO - middleware
    try {
      const obj = { ...body, id }
      this.baseService.setModel(model)
      return this.baseService.save(obj)
    } catch (error) {
      return error.name
    }
  }

  @Delete(':id')
  delete(@Param() { model, id }: { model: string; id: string }): any {
    // TODO - middleware
    try {
      this.baseService.setModel(model)
      return this.baseService.delete(id)
    } catch (error) {
      return error.name
    }
  }
}
