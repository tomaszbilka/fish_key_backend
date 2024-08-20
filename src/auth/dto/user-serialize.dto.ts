import { Expose } from 'class-transformer';

export class UserSerializeDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
