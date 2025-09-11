import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport'

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      let message = 'access_denied'

      if (info && info.name === 'TokenExpiredError') {
        message = 'token_expired'
      } else if (info && info.name === 'JsonWebTokenError') {
        message = 'token_invalid'
      }

      throw new UnauthorizedException({
        statusCode: 401,
        message,
        error: 'Unauthorized'
      })
    }

    return user
  }
}
