import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApp(): { welcome: string } {
    return { welcome: 'app' };
  }
}
