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
    private readonly service: BaseService,
    private errors: ErrorService
  ) {}

  // list table
  @Get()
  async list(
    @Param('model') model: string,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<any> {
    // TODO - middleware
    try {
      this.service.setModel(model)
      const params = this.queryParams.parseParams(req.query)
      const result = await this.service.list(params)
      res.status(200).json(result)
    } catch (error) {
      this.errors.response(error, res)
    }
  }

  // filter table
  @Post('filter')
  async filter(
    @Param('model') model: string,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<any> {
    // TODO - middleware
    try {
      this.service.setModel(model)
      const params = this.queryParams.parseParams(req.body)
      const result = await this.service.list(params)
      res.status(200).json(result)
    } catch (error) {
      this.errors.response(error, res)
    }
  }

  // select by id
  @Get(':id')
  async get(
    @Param() { model, id }: { model: string; id: string },
    @Req() req: Request,
    @Res() res: Response
  ): Promise<any> {
    // TODO - middleware
    try {
      this.service.setModel(model)
      const opt = this.queryParams
        .formatInclude({ include: req.query.include })
        .formatWhere({ where: { id } })
        .get()
      delete opt.take
      const result = await this.service.get(opt)
      res.status(200).json(result)
    } catch (error) {
      this.errors.response(error, res)
    }
  }

  // insert
  @Post()
  create(
    @Param('model') model: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    // TODO - middleware
    try {
      this.service.setModel(model)
      const result = this.service.save(req.body)
      res.status(200).json(result)
    } catch (error) {
      this.errors.response(error, res)
    }
  }

  // update
  @Put(':id')
  update(
    @Param() { model, id }: { model: string; id: string },
    @Body() body: any,
    @Res() res: Response
  ): any {
    // TODO - middleware
    try {
      const obj = { ...body, id }
      this.service.setModel(model)
      const result = this.service.save(obj)
      res.status(200).json(result)
    } catch (error) {
      this.errors.response(error, res)
    }
  }

  // delete
  @Delete(':id')
  delete(
    @Param() { model, id }: { model: string; id: string },
    @Res() res: Response
  ): any {
    // TODO - middleware
    try {
      this.service.setModel(model)
      const result = this.service.delete(id)
      res.status(200).json(result)
    } catch (error) {
      this.errors.response(error, res)
    }
  }
}
