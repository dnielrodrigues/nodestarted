// auth/auth.controller.ts
import { AuthGuard } from '@/guards/auth.guard'
import {
  Controller,
  Post,
  Req,
  Request,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Req() req: Request) {
    const { email, pass }: any = req.body
    const user = await this.authService.validateUser(email, pass)
    if (!user) throw new UnauthorizedException('access_denied')
    return this.authService.login(user)
  }

  @Post('register')
  async register(@Req() req: Request) {
    return this.authService.register(req.body)
  }

  // TODO - ???
  @UseGuards(AuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
