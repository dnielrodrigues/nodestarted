import { isUUIDv4 } from '@/shared/Lib'
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class UUIDPipe implements PipeTransform {
  transform(val: string): string {
    const isUUID = isUUIDv4(val)
    if (!isUUID) throw new BadRequestException('Invalid param ID') // TODO - replace for 404
    return val
  }
}
