import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ErrorService {
  constructor(private configService: ConfigService) {}

  format(error) {
    // TODO - register on errors log
    const envMode = this.configService.get('NODE_ENV') || 'development'
    if (envMode === 'development') console.log(error)

    // not found
    if (error === 'not_founded' || error.error === 'not_founded') {
      return {
        json: { error: 'not_founded' },
        status: 404
      }
    }

    // invalid param
    if (error === 'invalid_param' || error.error === 'invalid_param') {
      return {
        json: { error: 'invalid_param', param: error.param || 'unknow' },
        status: 400
      }
    }

    // database not connected
    if (error.name === 'PrismaClientInitializationError')
      return { json: { error: 'database_error' }, status: 503 }

    // model not found
    if (error === 'not_found' || error.error === 'not_found')
      return { json: { error: 'not_found' }, status: 404 }

    if (
      error.name === 'PrismaClientKnownRequestError' &&
      error.meta?.cause === 'No record was found for a delete.'
    )
      return { json: { error: 'not_found' }, status: 404 }

    // database error
    if (error.name === 'PrismaClientValidationError')
      return { json: { error: 'database_invalid_query' }, status: 400 }

    // unknow error
    console.error('========= ERROR: 6-32', error)
    return {
      json: { error: 'unknow_error' },
      status: 500
    }
  }

  response(error, res: any = null) {
    const obj = this.format(error)
    return res ? res.status(obj.status).json(obj.json) : obj
  }
}
