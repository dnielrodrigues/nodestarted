import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { AuthModule } from '@/modules/auth/auth.module'
import { BaseModule } from '@/modules/base/base.module'
import { UsuariosModule } from '@/modules/usuarios/usuarios.module'
import { DatabaseModule } from '@/shared/database/database.module'
import { ErrorModule } from '@/shared/error/error.module'
import { QueryParamsModule } from '@/shared/query-params/query-params.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    // ConfigModule.forRoot(), // load .env vars
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`
    }), // load .env vars
    DatabaseModule,
    UsuariosModule,
    AuthModule,
    BaseModule,
    ErrorModule,
    QueryParamsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
