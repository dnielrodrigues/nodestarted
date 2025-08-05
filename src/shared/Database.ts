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
