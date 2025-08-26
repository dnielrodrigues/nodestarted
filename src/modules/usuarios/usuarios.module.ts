import { AuthModule } from '@/modules/auth/auth.module'
import { DatabaseModule } from '@/shared/database/database.module'
import { Module, forwardRef } from '@nestjs/common'
import { UsuariosController } from './usuarios.controller'
import { UsuariosService } from './usuarios.service'

@Module({
  controllers: [UsuariosController],
  imports: [DatabaseModule, forwardRef(() => AuthModule)], // forwardRef = solve circular dependency
  providers: [UsuariosService],
  exports: [UsuariosService]
})
export class UsuariosModule {}
