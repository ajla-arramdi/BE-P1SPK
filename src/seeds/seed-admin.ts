import { NestFactory } from '@nestjs/core';
import { UsersService } from '../modules/users/users.service';
import { AppModule } from '../app.module';
import { UserRole } from '../modules/users/entities/user.entities';

async function seedAdmin() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const usersService = app.get(UsersService);

  try {
    const existingAdmin = await usersService.findByEmail('admin@example.com');
    if (existingAdmin) {
      console.log('Admin user already exists');
      await app.close();
      return;
    }
  } catch (error) {
    // User doesn't exist, continue with creation
  }

  const adminUser = await usersService.create({
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
    role: UserRole.ADMIN,
  });

  console.log('Admin user created:', adminUser);

  await app.close();
}

seedAdmin().catch((error) => {
  console.error('Error seeding admin:', error);
  process.exit(1);
});
