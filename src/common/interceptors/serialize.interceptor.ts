import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs';
import { plainToInstance } from 'class-transformer';

type ClassConstructor = { new (...args): unknown };

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(context: ExecutionContext, handler: CallHandler) {
    //run sth before a request is handled by the request handler

    return handler.handle().pipe(
      map((data: ClassConstructor) => {
        //run sth before response is sent out
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true, //ensure that data matches UserDto
        });
      }),
    );
  }
}
