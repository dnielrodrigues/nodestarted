import { UsuariosService } from '@/modules/usuarios/usuarios.service'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsuariosService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user: any = await this.usersService.findByEmail(email)
    if (user && (await bcrypt.compare(pass, user.pass))) return user
    return null
  }

  login(user: any) {
    const { email, id, nome, permissoes } = user
    const payload = { email, id, nome, permissoes } // TODO - reduzir apenas aos IDs
    const res = {
      access_token: this.jwtService.sign(payload),
      user: { email, id, nome, permissoes }
    }
    return res
  }

  async register(data: any) {
    if (this.configService.get('NODE_ENV') === 'development') {
      const pass = await bcrypt.hash(data.pass, 10)
      const user = await this.usersService.save({ ...data, pass })
      return this.login(user)
    } else throw { error: 'access_denied' }
  }
}
