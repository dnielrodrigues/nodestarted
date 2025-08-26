import { UsuariosService } from '@/modules/usuarios/usuarios.service'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsuariosService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user: any = await this.usersService.findByEmail(email)
    if (user && (await bcrypt.compare(password, user.password))) return user
    return null
  }

  login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      nome: user.nome
    }

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome
      }
    }
  }

  async register(data: any) {
    const pass = await bcrypt.hash(data.pass, 10)
    const user = await this.usersService.save({ ...data, pass })
    return this.login(user)
  }
}
