import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserEntity } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt';
import hashPassword from 'src/common/helpers/hashPassword';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  public async register(email: string, password: string): Promise<UserEntity> {
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await hashPassword(password);

    const newUser = { email, password: hashedPassword };

    const user = this.userRepository.create(newUser);

    return this.userRepository.save(user);
  }

  public async validateUser(
    email: string,
    userPassword: string,
  ): Promise<Partial<UserEntity>> {
    const user = await this.usersService.findByEmail(email);

    if (!user || !user.password) return null;

    const isPasswordValid = await bcrypt.compare(userPassword, user.password);

    if (!isPasswordValid) return null;

    const { password, ...loginUser } = user;

    return loginUser;
  }
}
