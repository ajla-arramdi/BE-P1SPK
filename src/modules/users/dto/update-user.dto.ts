// src/modules/users/dto/update-user.dto.ts
export class UpdateUserDto {
  readonly username?: string;
  readonly email?: string;
  readonly password?: string;
  readonly role?: string;
  readonly phone?: string;
  readonly address?: string;
}