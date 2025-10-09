import { DatabaseService } from '@/shared/database/database.service'
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common'

@Injectable()
export class BaseGuard implements CanActivate {
  constructor(private readonly db: DatabaseService) {}

  getUserIdOrThrow(user) {
    if (!user || !user.id) throw new ForbiddenException('access_denied')
    return user.id
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const { user, route, method } = request
    const path = route.path
    const userId = this.getUserIdOrThrow(user)

    const permission = await this.db.permissoes.findFirst({
      where: {
        usuario_id: userId,
        // TODO - incluir entidade
        // TODO - otimizar aplicativo
        aplicativos: {
          slug: 'authentication'
        },
        acoes: { path, method }
      }
    })

    if (permission) return true
    throw new ForbiddenException('access_forbidden')
  }
}
