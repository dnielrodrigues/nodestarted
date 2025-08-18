import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { AppModule as App2Module } from '@/app/app.module'
import { BaseModule } from '@/modules/base/base.module'
import { ErrorModule } from '@/modules/error/error.module'
import { DatabaseModule } from '@/shared/database/database.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    App2Module,
    BaseModule,
    ErrorModule,
    DatabaseModule,
    ConfigModule.forRoot() // load .env vars
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
