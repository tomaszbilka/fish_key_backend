import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UsersService) {}
}
