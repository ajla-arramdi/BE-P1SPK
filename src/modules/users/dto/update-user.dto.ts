import { IsEmail, IsOptional, IsEnum, MinLength } from 'class-validator';
import { UserRole } from '../entities/user.entities';

export class UpdateUserDto {
  @IsOptional()
  username?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Format email tidak valid' })
  email?: string;

  @IsOptional()
  @MinLength(6, { message: 'Password minimal 6 karakter' })
  password?: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Role harus admin, staff, atau user' })
  role?: UserRole;
}
