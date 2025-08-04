import { BaseModule } from '@/modules/base/base.module'
import { DatabaseModule } from '@/modules/database/database.module'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppModule as App2Module } from './app/app.module'

@Module({
  imports: [App2Module, BaseModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
