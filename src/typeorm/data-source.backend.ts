import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const dataSourceOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    database: configService.get<string>('DB_NAME'),
    entities: [__dirname + '/**/**.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    password: configService.get<string>('DB_PASSWORD'),
    port: configService.get<number>('DB_PORT'),
    synchronize: false,
    type: 'postgres',
    username: configService.get<string>('DB_USERNAME'),
  }),
};
