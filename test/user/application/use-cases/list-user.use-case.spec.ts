import { Test, TestingModule } from '@nestjs/testing';
import { ListUserUseCase } from '../../../../src/user/application/use-cases/list-user.use-case';
import { UserRepositoryInterface } from '../../../../src/user/application/interfaces';
import { ListUsersParamsDto } from '../../../../src/user/application/dtos';
import { UserEntity } from '../../../../src/user/application/entities';
import { faker } from '@faker-js/faker';
import { UserRole } from '../../../../src/user/shared/enums';

describe('ListUserUseCase', () => {
  let useCase: ListUserUseCase;
  let userRepository: UserRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListUserUseCase,
        {
          provide: 'UserRepositoryInterface',
          useValue: {
            list: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<ListUserUseCase>(ListUserUseCase);
    userRepository = module.get<UserRepositoryInterface>('UserRepositoryInterface');
  });

  it('should list users based on parameters', async () => {
    const listUsersParamsDto: ListUsersParamsDto = {};

    const users: UserEntity[] = [
      {
        id: faker.string.uuid(),
        name: faker.string.sample(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.helpers.enumValue(UserRole),
        created_at: faker.date.past(),
        updated_at: faker.date.past()
      },
    ];

    (userRepository.list as jest.Mock).mockResolvedValue(users);

    const result = await useCase.execute(listUsersParamsDto);

    expect(userRepository.list).toHaveBeenCalledWith(listUsersParamsDto);
    expect(result).toEqual(users);
  });
});
