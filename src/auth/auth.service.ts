import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserEntity } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt';
import hashPassword from 'src/common/helpers/hashPassword';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/common/emials/email.service';
import { getWelcomeTemplate } from 'src/common/emials/templates/utils';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
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

    const html = getWelcomeTemplate(user.email);

    await this.emailService.sendEmail({
      to: user.email,
      from: 'test@test.com',
      subject: 'Welcome',
      html,
    });

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

  async login(user: UserEntity) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
    };
  }
}
