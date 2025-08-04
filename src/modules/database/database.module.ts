import { PrismaService } from '@/shared/prisma.service'
import { Global, Module } from '@nestjs/common'

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class DatabaseModule {}
