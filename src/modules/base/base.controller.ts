import { UUIDPipe } from '@/pipes/uuid.pipe'
import { ErrorService } from '@/shared/error/error.service'
import { QueryParamsService } from '@/shared/query-params/query-params.service'
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
  constructor(
    private readonly service: BaseService,
    private readonly query: QueryParamsService,
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
      const params = this.query.parseParams(req.query)
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
      const params = this.query.parseParams(req.body)
      const result = await this.service.list(params)
      res.status(200).json(result)
    } catch (error) {
      this.errors.response(error, res)
    }
  }

  // select by id
  @Get(':id')
  async get(
    @Param('id', UUIDPipe) id: string,
    @Param('model') model: string,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<any> {
    // TODO - middleware
    try {
      this.service.setModel(model)
      const opt = this.query
        .formatInclude({ include: req.query.include })
        .formatWhere({ where: { id } })
        .get()
      delete opt.take
      const result = await this.service.get(opt)
      if (result) res.status(200).json(result)
      else throw { error: 'not_founded' }
    } catch (error) {
      this.errors.response(error, res)
    }
  }

  // insert
  @Post()
  async create(
    @Param('model') model: string,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<any> {
    // TODO - middleware
    try {
      this.service.setModel(model)
      const result = await this.service.save(req.body)
      res.status(200).json(result)
    } catch (error) {
      this.errors.response(error, res)
    }
  }

  // update
  @Put(':id')
  async update(
    @Param() { model, id }: { model: string; id: string },
    @Body() body: any,
    @Res() res: Response
  ): Promise<any> {
    // TODO - middleware
    try {
      const obj = { ...body, id }
      this.service.setModel(model)
      const result = await this.service.save(obj)
      res.status(200).json(result)
    } catch (error) {
      this.errors.response(error, res)
    }
  }

  // delete
  @Delete(':id')
  async delete(
    @Param('id', UUIDPipe) id: string,
    @Param('model') model: string,
    @Res() res: Response
  ): Promise<any> {
    // TODO - middleware
    try {
      this.service.setModel(model)
      const result = await this.service.delete(id)
      res.status(200).json(result)
    } catch (error) {
      this.errors.response(error, res)
    }
  }
}
