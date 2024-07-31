import { INestApplication, ValidationPipe } from '@nestjs/common';

export const setupApp = (app: INestApplication<any>) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
};
