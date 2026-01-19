// src/modules/staff/dto/update-staff.dto.ts
export class UpdateStaffDto {
  readonly username?: string;
  readonly email?: string;
  readonly password?: string;
  readonly role?: string;
  readonly phone?: string;
  readonly address?: string;
}