import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { databaseConfig } from './config/database.config';
import { UsersModule } from './modules/users/users.module';
import { StaffModule } from './modules/staff/staff.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig), // 🔥 koneksi ke PostgreSQL
    UsersModule,                           // 🔥 module users
    StaffModule,                           // 🔥 module staff
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
