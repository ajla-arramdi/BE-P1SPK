// src/modules/users/dto/create-user.dto.ts
export class CreateUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly role?: string;
  readonly phone?: string;
  readonly address?: string;
}