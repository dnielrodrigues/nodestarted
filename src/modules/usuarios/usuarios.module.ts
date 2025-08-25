import { AuthModule } from '@/modules/auth/auth.module'
import { DatabaseModule } from '@/shared/database/database.module'
import { Module } from '@nestjs/common'
import { UsuariosController } from './usuarios.controller'
import { UsuariosService } from './usuarios.service'

@Module({
  controllers: [UsuariosController],
  imports: [DatabaseModule, AuthModule],
  providers: [UsuariosService]
})
export class UsuariosModule {}
