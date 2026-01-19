// src/modules/staff/dto/create-staff.dto.ts
export class CreateStaffDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly role?: string;
  readonly phone?: string;
  readonly address?: string;
}