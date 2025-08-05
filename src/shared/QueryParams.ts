import { isJsonString, isString } from '@/shared/Lib'

export class QueryParams {
  take?: number
  skip?: number
  orderBy?: object
  where?: object
  include?: object
  paramsFormatted: string[] = ['take', 'skip', 'orderBy', 'where', 'include']
  paramsAllowed: string[] = [
    'limit',
    'offset',
    'orderBy',
    'order',
    'where',
    'include'
  ]

  parseParams(params) {
    return this.formatLimit(params)
      .formatOffset(params)
      .formatOrderBy(params)
      .formatWhere(params)
      .formatInclude(params)
      .get()
  }

  parseRequest(request) {
    const params: any = this.getQueryParamsFromRequest(request)
    return this.parseParams(params)
  }

  getQueryParamsFromRequest(request) {
    const method = request.method
    const res = {}
    if (method === 'POST') {
      const data = request.body
      this.paramsAllowed.forEach((param) => {
        res[param] = data[param] || null
      })
    } else if (method === 'GET') {
      this.paramsAllowed.forEach((param) => {
        res[param] = request.query[param] || null
      })
    }
    return res
  }

  // basic formatters
  formatLimit(obj: any) {
    const limit = parseInt(obj.limit) || 10
    if (limit !== -1) this.take = limit
    return this
  }

  formatOffset(obj: any) {
    const offset = parseInt(obj.offset)
    if (offset) this.skip = offset
    return this
  }

  formatOrderBy(obj: any) {
    const orderBy = obj.orderBy
    const order = obj.order || 'asc'
    if (orderBy) {
      this.orderBy = {}
      this.orderBy[orderBy] =
        order === 'DESC' || order === 'desc' ? 'desc' : 'asc'
    }
    return this
  }

  /**
   * REFERENCE to where options:
   * https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries#include-a-relation
   * https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries#include-deeply-nested-relations
   * -----------------------------------------------------------------------------------------------------
   */
  formatWhere(obj: any) {
    const where = obj.where || null
    if (!where) return this
    else if (isString(where) && !isJsonString(where))
      throw { error: 'invalid_param', param: 'where' }
    else if (isJsonString(where)) this.where = JSON.parse(String(where))
    else this.where = where
    return this
  }

  /**
   * REFERENCE to includes options:
   * https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries#include-a-relation
   * ----------------------------------------------------------------------------------------
   */
  formatInclude(obj) {
    const include: any = obj.include || null
    if (!include) return this
    else if (isString(include) && !isJsonString(include))
      throw { error: 'invalid_param', param: 'include' }
    else if (isJsonString(include)) this.include = JSON.parse(String(include))
    else this.include = include
    return this
  }

  // getters/setters
  get(opt?: any) {
    if (opt) return this[opt] || null // TODO - melhorar com testes para atributos
    const res = {}
    this.paramsFormatted.forEach((param) => {
      if (this[param]) res[param] = this[param]
    })
    return res
  }

  set(str: string, val: any) {
    if (val && str) this[str] = val
  }
}
