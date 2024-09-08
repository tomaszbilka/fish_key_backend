import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  readonly resetToken: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly newPassword: string;
}
