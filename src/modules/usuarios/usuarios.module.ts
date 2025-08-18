import { BaseModule } from '@/modules/base/base.module'
import { Module } from '@nestjs/common'
import { UsuariosController } from './usuarios.controller'
import { UsuariosService } from './usuarios.service'

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService]
})
export class UsuariosModule extends BaseModule {}
