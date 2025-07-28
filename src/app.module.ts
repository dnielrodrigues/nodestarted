import { BaseModule } from '@/modules/base/base.module'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppModule as App2Module } from './app/app.module'

@Module({
  imports: [App2Module, BaseModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
