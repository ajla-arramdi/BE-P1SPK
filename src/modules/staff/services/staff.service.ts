// src/modules/staff/services/staff.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from '../entities/staff.entity';
import { CreateStaffDto } from '../dto/create-staff.dto';
import { UpdateStaffDto } from '../dto/update-staff.dto';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) {}

  async findAll(): Promise<Staff[]> {
    return await this.staffRepository.find();
  }

  async findOne(id: string): Promise<Staff> {
    const staff = await this.staffRepository.findOne({ where: { id } });
    if (!staff) {
      throw new NotFoundException(`Staff member with ID ${id} not found`);
    }
    return staff;
  }

  async findByEmail(email: string): Promise<Staff> {
    return await this.staffRepository.findOne({ where: { email } });
  }

  async create(createStaffDto: CreateStaffDto): Promise<Staff> {
    const staff = new Staff();
    Object.assign(staff, createStaffDto);
    
    // Hash password before saving (in a real app, you'd use bcrypt)
    // For now, storing plain text - implement proper hashing in production
    
    return await this.staffRepository.save(staff);
  }

  async update(id: string, updateStaffDto: UpdateStaffDto): Promise<Staff> {
    const staff = await this.findOne(id);
    
    Object.assign(staff, updateStaffDto);
    
    return await this.staffRepository.save(staff);
  }

  async remove(id: string): Promise<void> {
    const staff = await this.findOne(id);
    await this.staffRepository.remove(staff);
  }
}