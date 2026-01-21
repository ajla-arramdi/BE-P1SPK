import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from './entities/user.entities';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * GET /users
   * Hanya Admin yang dapat melihat semua user
   */
  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * GET /users/profile
   * User dapat melihat profil sendiri
   */
  @Get('profile')
  getProfile(@Request() req) {
    return this.usersService.findOne(req.user.id);
  }

  /**
   * GET /users/:id
   * Hanya Admin yang dapat melihat user tertentu
   */
  @Get(':id')
  @Roles(UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * POST /users
   * Hanya Admin yang dapat membuat user/staff baru
   */
  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * PUT /users/:id
   * Admin dapat update semua user
   * Staff & User hanya dapat update diri sendiri
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    const currentUser = req.user;

    // Admin dapat update siapa saja
    if (currentUser.role === UserRole.ADMIN) {
      return this.usersService.update(id, updateUserDto);
    }

    // Staff & User hanya dapat update diri sendiri
    if (currentUser.id !== id) {
      throw new ForbiddenException('Anda hanya dapat mengubah data sendiri');
    }
    // Staff & User tidak boleh mengubah role
    delete updateUserDto.role;
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * DELETE /users/:id
   * Hanya Admin yang dapat menghapus user
   */
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
