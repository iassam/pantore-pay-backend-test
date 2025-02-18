import { UserEntity } from "./user.entity";
import { UserRole } from "../../shared/enums";
import { faker } from '@faker-js/faker';
import { plainToClass } from "class-transformer";

describe('UserEntity', () => {
    const generateUserMock = () => {
        const user = new UserEntity();
        user.id = faker.string.uuid();
        user.name = faker.string.sample();
        user.email = faker.internet.email();
        user.role = UserRole.CLIENT;
        user.created_at = faker.date.past();
        user.updated_at = faker.date.recent();
        user.password = faker.internet.password();

        return plainToClass(UserEntity, user);
    }

  it('should create an instance of UserEntity', () => {
    const user = new UserEntity();
    expect(user).toBeInstanceOf(UserEntity);
  });

  it('should expose id, name, email, role, created_at, and updated_at', () => {
    const user = generateUserMock();

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(UserEntity);
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("role");
  });

  it('should exclude password', () => {
    const plainUser = generateUserMock()
    expect(plainUser.password).toBeUndefined();
  });
});
