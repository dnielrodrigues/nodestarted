import { JwtStrategy } from '@/modules/auth/strategies/jwt.strategy'
import { UsuariosModule } from '@/modules/usuarios/usuarios.module'
import { forwardRef, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    forwardRef(() => UsuariosModule), // forwardRef = solve circular dependency
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET')!,
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '1d')
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
