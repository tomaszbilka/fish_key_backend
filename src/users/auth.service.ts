import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async signup() {
    return 'user created!';
  }

  async signin() {
    return 'logged in!';
  }
}
