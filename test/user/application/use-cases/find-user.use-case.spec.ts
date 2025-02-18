import { Test, TestingModule } from '@nestjs/testing';
import { FindUserUseCase } from '../../../../src/user/application/use-cases/find-user.use-case';
import { UserRepositoryInterface } from '../../../../src/user/application/interfaces';
import { UserEntity } from '../../../../src/user/application/entities';
import { faker } from '@faker-js/faker';
import { UserRole } from '../../../../src/user/shared/enums';

describe('FindUserUseCase', () => {
  let useCase: FindUserUseCase;
  let userRepository: UserRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserUseCase,
        {
          provide: 'UserRepositoryInterface',
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<FindUserUseCase>(FindUserUseCase);
    userRepository = module.get<UserRepositoryInterface>('UserRepositoryInterface');
  });

  it('should find user by ID', async () => {
    const userMockId = faker.string.uuid();
    const userMock: UserEntity = {
      id: userMockId,
      name: faker.string.sample(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: faker.helpers.enumValue(UserRole),
      created_at: faker.date.past(),
      updated_at: faker.date.past()
    };

    (userRepository.findById as jest.Mock).mockResolvedValue(userMock);

    const result = await useCase.execute(userMockId);

    expect(userRepository.findById).toHaveBeenCalledWith(userMockId);
    expect(result).toEqual(userMock);
  });
});
