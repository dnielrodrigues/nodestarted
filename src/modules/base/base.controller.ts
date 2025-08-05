import { ErrorService } from '@/modules/error/error.service'
import { QueryParams } from '@/shared/QueryParams'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res
} from '@nestjs/common'
import { Request, Response } from 'express'
import { BaseService } from './base.service'

@Controller(':model')
export class BaseController {
  queryParams = new QueryParams()

  constructor(
    private readonly baseService: BaseService,
    private errors: ErrorService
  ) {}

  @Get()
  async list(
    @Param('model') model: string,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<any> {
    // TODO - middleware
    try {
      this.baseService.setModel(model)
      const params = this.queryParams.parseParams(req.query)
      const result = await this.baseService.list(params)
      res.status(200).json(result)
    } catch (error) {
      return this.errors.response(error, res)
    }
  }

  @Post('filter')
  async filter(
    @Param('model') model: string,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<any> {
    // TODO - middleware
    try {
      this.baseService.setModel(model)
      const params = this.queryParams.parseParams(req.body)
      const result = await this.baseService.list(params)
      res.status(200).json(result)
    } catch (error) {
      return this.errors.response(error, res)
    }
  }

  @Get(':id')
  get(
    @Param() { model, id }: { model: string; id: string },
    @Res() res: Response
  ): any {
    // TODO - middleware
    try {
      this.baseService.setModel(model)
      const result = this.baseService.get(id)
      res.status(200).json(result)
    } catch (error) {
      return this.errors.response(error, res)
    }
  }

  @Post()
  create(
    @Param('model') model: string, @Body() body: any,
    @Res() res: Response
  ) {
    // TODO - middleware
    try {
      this.baseService.setModel(model)
      const result = this.baseService.save(body)
      res.status(200).json(result)
    } catch (error) {
      return this.errors.response(error, res)
    }
  }

  @Put(':id')
  update(
    @Param() { model, id }: { model: string; id: string },
    @Body() body: any,
    @Res() res: Response
  ): any {
    // TODO - middleware
    try {
      const obj = { ...body, id }
      this.baseService.setModel(model)
      const result = this.baseService.save(obj)
      res.status(200).json(result)
    } catch (error) {
      return this.errors.response(error, res)
    }
  }

  @Delete(':id')
  delete(
    @Param() { model, id }: { model: string; id: string },
    @Res() res: Response
  ): any {
    // TODO - middleware
    try {
      this.baseService.setModel(model)
      const result = this.baseService.delete(id)
      res.status(200).json(result)
    } catch (error) {
      return this.errors.response(error, res)
    }
  }
}
