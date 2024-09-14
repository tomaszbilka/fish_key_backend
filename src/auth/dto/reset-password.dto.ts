import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly resetToken: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly newPassword: string;
}
