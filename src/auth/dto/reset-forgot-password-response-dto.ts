import { ApiProperty } from '@nestjs/swagger';

export class ResetForgotPasswordResponseDto {
  @ApiProperty()
  readonly message: string;
}
