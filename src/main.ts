import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from './setup-app';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { exportSchemaToFile } from './utils/save-swagger-to-file';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  setupApp(app);
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN'),
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Fishkey API')
    .setDescription('API for fishkey')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  exportSchemaToFile(document);

  const PORT = configService.get<number>('PORT');
  await app.listen(PORT || 3000);
}
bootstrap();
