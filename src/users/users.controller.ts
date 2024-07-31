import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('/signup')
  async createUser() {
    return this.userService.createUser();
  }
}
