import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Partial<UserEntity>> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new HttpException(
        'Email or password is not valid!',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
