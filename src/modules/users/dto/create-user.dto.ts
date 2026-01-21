import { IsEmail, IsNotEmpty, IsOptional, IsEnum, MinLength } from 'class-validator';
import { UserRole } from '../entities/user.entities';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username wajib diisi' })
  username: string;

  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email wajib diisi' })
  email: string;

  @IsNotEmpty({ message: 'Password wajib diisi' })
  @MinLength(6, { message: 'Password minimal 6 karakter' })
  password: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Role harus admin, staff, atau user' })
  role?: UserRole;
}
