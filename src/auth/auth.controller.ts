import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { UserEntity } from 'src/users/user.entity';
import { UserSerializeDto } from './dto/user-serialize.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Serialize(UserSerializeDto)
  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.authService.register(
      createUserDto.email,
      createUserDto.password,
    );

    return user;
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const resetData = await this.authService.forgotPassword(
      forgotPasswordDto.email,
    );

    return { message: 'Password reset email sent successfully' };
  }

  @Get('test')
  async testGuards() {
    return 'Guards works as expected!';
  }
}
