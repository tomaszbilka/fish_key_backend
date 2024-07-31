import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  createUser() {
    return 'user created';
  }

  findOne() {
    return 'find one user';
  }

  updateUser() {
    return 'update the user';
  }

  deleteUser() {
    return 'userDeleted';
  }
}
