import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { EmailModule } from 'src/common/emials/emails.module';
import { ResetTokenEntity } from './resetToken.entity';

@Module({
  imports: [
    UsersModule,
    EmailModule,
    TypeOrmModule.forFeature([UserEntity, ResetTokenEntity]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get<string>('JWT_SECRET')!,
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRATION_TIME'),
          },
        };
      },
      inject: [ConfigService],
      global: true,
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    LocalStrategy,
    JwtService,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
