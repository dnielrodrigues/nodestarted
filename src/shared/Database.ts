import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

type PrismaModel = Exclude<keyof typeof prisma, `$${string}` | symbol>

export function getModel<T extends PrismaModel>(
  model: string
): (typeof prisma)[T] {
  const res = prisma[model]
  if (!res) {
    throw { error: 'not_found', param: 'model' }
  }
  return res
}

// import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
// import { PrismaClient } from '@prisma/client'

// @Injectable()
// export class Database
//   extends PrismaClient
//   implements OnModuleInit, OnModuleDestroy
// {
//   constructor() {
//     super()
//   }

//   async onModuleInit() {
//     await this.$connect()
//   }

//   async onModuleDestroy() {
//     await this.$disconnect()
//   }

//   getModel(str: string) {
//     const res = this[str as keyof typeof this]
//     if (res) return res
//     else throw { error: 'not_found', param: 'model' }
//   }
// }
