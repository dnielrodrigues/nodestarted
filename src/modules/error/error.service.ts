import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ErrorService {
  constructor(private configService: ConfigService) {}

  format(error) {
    // TODO - register on errors log
    const envMode = this.configService.get('NODE_ENV') || 'development'
    if (envMode === 'development') console.log(error)

    // user not found
    // if (error.code === 'auth/user-not-found')
    //   return { json: { error: error.code }, status: 404 }

    // invalid UID of a requisition
    // if (error.code === 'auth/invalid-uid')
    //   return { json: { error: error.code }, status: 404 }

    // invalid password
    // if (error.code === 'auth/invalid-password')
    //   return { json: { error: error.code }, status: 401 }

    // invalid access token
    // if (error.codePrefix === 'auth')
    //   return { json: { error: 'access_denied' }, status: 401 }

    // firebase authentication
    // if (typeof error.code === 'string')
    //   return { json: { error: error.code }, status: 401 }

    // firestore error
    if (error.errorCode === 'firestore/unknow')
      return { json: { error: 'firestore_unknow' }, status: 400 }

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
