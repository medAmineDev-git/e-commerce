// seed-users.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from "../app.module";
import { UserService } from "../modules/users/services/user.service";
import { User } from "../modules/users/models/user.model";


async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);

  try {
    // Sample users to insert
    const users = [
      {
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
      },
      {
        name: 'Jane',
        surname: 'Doe',
        email: 'jane.doe@example.com',
      },
      {
        name: 'Alice',
        surname: 'Smith',
        email: 'alice.smith@example.com',
      },
      {
        name: 'Bob',
        surname: 'Johnson',
        email: 'bob.johnson@example.com',
      },
    ];

    for (const userData of users) {
      await userService.create(userData);
      console.log(`Seeded user: ${userData.name} ${userData.surname}`);
    }

  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    await app.close();
  }
}

seed();
