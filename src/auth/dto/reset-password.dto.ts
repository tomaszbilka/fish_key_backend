import { IsEmail, isNotEmpty, IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  readonly resetToken: string;

  @IsNotEmpty()
  @IsString()
  readonly newPassword: string;
}
