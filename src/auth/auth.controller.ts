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
import { UserSerializeDto } from './dto/user-serialize.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ApiResponse } from '@nestjs/swagger';
import { ResetForgotPasswordResponseDto } from './dto/reset-forgot-password-response-dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ type: UserSerializeDto })
  @Serialize(UserSerializeDto)
  @Public()
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserSerializeDto> {
    const user = await this.authService.register(
      createUserDto.email,
      createUserDto.password,
    );

    return user;
  }

  @ApiResponse({ type: LoginResponseDto })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }

  @ApiResponse({ type: ResetForgotPasswordResponseDto })
  @Public()
  @Post('forgot-password')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<ResetForgotPasswordResponseDto> {
    await this.authService.forgotPassword(forgotPasswordDto.email);

    return { message: 'Password reset email sent successfully' };
  }

  @ApiResponse({ type: ResetForgotPasswordResponseDto })
  @Public()
  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<ResetForgotPasswordResponseDto> {
    await this.authService.resetPassword(
      resetPasswordDto.resetToken,
      resetPasswordDto.newPassword,
    );

    return { message: 'Password reset successfully' };
  }

  @Get('test')
  async testGuards(): Promise<string> {
    return 'Guards works as expected!';
  }
}
