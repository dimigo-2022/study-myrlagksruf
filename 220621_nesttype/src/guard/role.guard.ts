import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    // console.log(context.switchToHttp().getRequest<FastifyRequest>());
    return true;
  }
}
