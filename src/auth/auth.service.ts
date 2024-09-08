import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/common/emials/email.service';
import {
  getResstPasswordTemplate,
  getWelcomeTemplate,
} from 'src/common/emials/templates/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { nanoid } from 'nanoid';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import hashPassword from 'src/common/helpers/hashPassword';
import { ResetTokenEntity } from './resetToken.entity';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ResetTokenEntity)
    private resetTokenRepository: Repository<ResetTokenEntity>,
  ) {}

  private async getOneByToken(resetToken: string) {
    const resetTokenDB = await this.resetTokenRepository.findOne({
      where: { resetToken },
      relations: ['user'],
    });

    if (!resetTokenDB) throw new NotFoundException('Invalid token');

    if (resetTokenDB.expiresAt < new Date()) {
      await this.deleteToken(resetTokenDB.id);
      throw new NotFoundException('Token expired');
    }

    return resetTokenDB;
  }

  private async deleteToken(id: number) {
    const deletedToken = await this.resetTokenRepository.delete(id);

    if (!deletedToken) throw new NotFoundException('Token not found');
  }

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

  public async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User with provided email does not exist');
    }

    const existingResetToken = await this.resetTokenRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (existingResetToken) {
      await this.resetTokenRepository.delete(existingResetToken.id);
    }

    const resetToken = nanoid(64);
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    const resetData = this.resetTokenRepository.create({
      resetToken,
      expiresAt: expiryDate,
      user,
    });

    if (!resetData) {
      throw new HttpException(
        'Error creating reset token',
        HttpStatus.NOT_IMPLEMENTED,
      );
    }

    await this.resetTokenRepository.save(resetData);

    const resetLink = `${this.configService.get<string>('CORS_ORIGIN')}/auth/reset-password/?resetToken=${resetToken}`;

    const html = getResstPasswordTemplate(resetLink);

    await this.emailService.sendEmail({
      to: user.email,
      from: 'test@test.com',
      subject: 'Reset your password',
      html,
    });
  }

  public async resetPassword(resetToken: string, newPassword: string) {
    const tokenEntity = await this.getOneByToken(resetToken);

    await this.usersService.resetPassword(tokenEntity.user.id, newPassword);

    await this.deleteToken(tokenEntity.id);
  }
}
