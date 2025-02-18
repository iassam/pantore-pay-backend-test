import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../../../src/user/user.module';
import { CreateUserDto, UpdateUserDto, ListUsersParamsDto } from '../../../src/user/application/dtos';
import { UserEntity } from '../../../src/user/application/entities';
import { faker } from '@faker-js/faker';
import { UserRole } from '../../../src/user/shared/enums';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '../../../src/user/infrastructure/models';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule, 
        ConfigModule.forRoot(),
          TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            synchronize: false,
            autoLoadEntities: false,
            entities: [UserModel],
          }),],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST) should create a new user', () => {
    const createUserDto: CreateUserDto = {
      name: faker.string.alphanumeric(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: faker.helpers.enumValue(UserRole)
    };

    return request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toBeTruthy()
      });
  });

  it('/users (GET) should list users based on query parameters', () => {
    return request(app.getHttpServer())
      .get('/users')
      .query({})
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        res.body.forEach((user: UserEntity) => {
          expect(user).toHaveProperty('id');
          expect(user).toHaveProperty('name');
          expect(user).toHaveProperty('email');
          expect(user).toHaveProperty('created_at');
          expect(user).toHaveProperty('updated_at');
          expect(user).not.toHaveProperty('password');

          if(user?.id)
            userId = user?.id;
        });
      });
  });

  it('/users/:id (PATCH) should update an existing user', () => {
    const updateUserDto: UpdateUserDto = {
      email: faker.internet.email(),
    };

    return request(app.getHttpServer())
      .patch(`/users/${userId}`)
      .send(updateUserDto)
      .expect(204)
      .expect((res) => {
        expect(res.body).toBeTruthy()
      });
  });

  it('/users/:id (GET) should find a user by ID', () => {
    return request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeTruthy();
        expect(res.body).toHaveProperty('id', userId);
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('email');
        expect(res.body).toHaveProperty('created_at');
        expect(res.body).toHaveProperty('updated_at');
        expect(res.body).not.toHaveProperty('password');
      });
  });
});
