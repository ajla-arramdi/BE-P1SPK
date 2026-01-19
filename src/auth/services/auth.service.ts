// src/auth/services/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../modules/users/services/users.service';
import { StaffService } from '../../modules/staff/services/staff.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private staffService: StaffService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // Try to find user in users table
    let user = await this.usersService.findByEmail(email);
    
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const { password, ...result } = user;
        return result;
      }
    }
    
    // If not found in users, try staff table
    user = await this.staffService.findByEmail(email);
    
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const { password, ...result } = user;
        return result;
      }
    }
    
    return null;
  }
}