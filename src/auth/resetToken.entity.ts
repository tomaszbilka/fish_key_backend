import { UserEntity } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'resetTokens' })
export class ResetTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  resetToken: string;

  @Column()
  expiresAt: Date;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
