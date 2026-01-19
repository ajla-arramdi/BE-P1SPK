// src/modules/staff/controllers/staff.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { StaffService } from '../services/staff.service';
import { CreateStaffDto } from '../dto/create-staff.dto';
import { UpdateStaffDto } from '../dto/update-staff.dto';
import { Staff } from '../entities/staff.entity';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../../auth/guards/roles.guard';

@Controller('staff')
@UseGuards(RolesGuard)
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get()
  @Roles('admin', 'superadmin')
  async findAll(): Promise<Staff[]> {
    return await this.staffService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'superadmin')
  async findOne(@Param('id') id: string): Promise<Staff> {
    try {
      return await this.staffService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`Staff member with ID ${id} not found`);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles('admin', 'superadmin')
  async create(@Body() createStaffDto: CreateStaffDto): Promise<Staff> {
    // Set role to 'staff' by default when created by admin
    if (!createStaffDto.role) {
      createStaffDto.role = 'staff';
    }
    return await this.staffService.create(createStaffDto);
  }

  @Put(':id')
  @Roles('admin', 'superadmin')
  async update(
    @Param('id') id: string,
    @Body() updateStaffDto: UpdateStaffDto,
  ): Promise<Staff> {
    try {
      return await this.staffService.update(id, updateStaffDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`Staff member with ID ${id} not found`);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles('admin', 'superadmin')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.staffService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`Staff member with ID ${id} not found`);
    }
  }
}