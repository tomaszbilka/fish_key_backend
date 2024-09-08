import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import hashPassword from 'src/common/helpers/hashPassword';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async resetPassword(userId: number, newPassword: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found');

    const hashedPassword = await hashPassword(newPassword);

    await this.userRepository.update(userId, {
      password: hashedPassword,
    });
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email } });
  }

  updateUser() {
    return 'update the user';
  }

  deleteUser() {
    return 'userDeleted';
  }

  createUser() {
    return 'user created';
  }
}
