import { Test, TestingModule } from '@nestjs/testing';
import { MergeUserDataUseCase } from '../../../../src/user/application/use-cases/merge-user-data.use-case';
import { UserEntity } from '../../../../src/user/application/entities';
import { encPassword, removeNullAttributes } from '../../../../src/user/shared/helpers';
import { faker } from '@faker-js/faker';
import { UserRole } from '../../../../src/user/shared/enums';

jest.mock('../../../../src/user/shared/helpers', () => ({
  encPassword: jest.fn(),
  removeNullAttributes: jest.fn(),
}));

describe('MergeUserDataUseCase', () => {
  let useCase: MergeUserDataUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MergeUserDataUseCase],
    }).compile();

    useCase = module.get<MergeUserDataUseCase>(MergeUserDataUseCase);
  });

  it('should merge user data correctly', async () => {
    
    const storedUserData: UserEntity = {
        id: faker.string.uuid(),
        name: faker.string.sample(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.helpers.enumValue(UserRole),
        created_at: faker.date.past(),
        updated_at: faker.date.past()
    };

    const updatedUserData: Partial<UserEntity> = {
      name: faker.string.sample(),
      email: faker.internet.email(),
    };

    (removeNullAttributes as jest.Mock).mockReturnValue(updatedUserData);

    const result = await useCase.execute(storedUserData, updatedUserData);

    expect(result).toEqual({
      ...storedUserData,
      ...updatedUserData,
    });
  });

  it('should encrypt password if updatedUserData contains password', async () => {
    const storedUserData: UserEntity = {
        id: faker.string.uuid(),
        name: faker.string.sample(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.helpers.enumValue(UserRole),
        created_at: faker.date.past(),
        updated_at: faker.date.past()
    };

    const updatedUserData: Partial<UserEntity> = {
      password: faker.internet.password(),
    };

    const encryptedPassword = faker.internet.password();
    (encPassword as jest.Mock).mockResolvedValue(encryptedPassword);
    (removeNullAttributes as jest.Mock).mockReturnValue(updatedUserData);

    const result = await useCase.execute(storedUserData, updatedUserData);

    expect(result.password).toBe(encryptedPassword);
  });
});
