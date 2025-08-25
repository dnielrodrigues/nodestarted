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
      name: user.name
    }

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    }
  }

  async register(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const user = await this.usersService.save({
      ...data,
      password: hashedPassword
    })
    return this.login(user)
  }
}
