import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserUseCase } from '../../../../src/user/application/use-cases/update-user.use-case';
import { UserRepositoryInterface } from '../../../../src/user/application/interfaces';
import { MergeUserDataUseCase } from '../../../../src/user/application/use-cases/merge-user-data.use-case';
import { UpdateUserDto } from '../../../../src/user/application/dtos';
import { UserEntity } from '../../../../src/user/application/entities';
import { faker } from '@faker-js/faker';
import { UserRole } from '../../../../src/user/shared/enums';

describe('UpdateUserUseCase', () => {
  let useCase: UpdateUserUseCase;
  let userRepository: UserRepositoryInterface;
  let mergeUserDataUseCase: MergeUserDataUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserUseCase,
        {
          provide: 'UserRepositoryInterface',
          useValue: {
            findById: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: MergeUserDataUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);
    userRepository = module.get<UserRepositoryInterface>('UserRepositoryInterface');
    mergeUserDataUseCase = module.get<MergeUserDataUseCase>(MergeUserDataUseCase);
  });

  it('should update user data correctly', async () => {
    const userId = faker.string.uuid();
    const updateUserDto: UpdateUserDto = {
      name: faker.string.sample(),
      email: faker.internet.email(),
    };

    const storedUser: UserEntity = {
      id: userId,
      name: faker.string.sample(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: faker.helpers.enumValue(UserRole),
      created_at: faker.date.past(),
      updated_at: faker.date.past()
    };

    const mergedUser: UserEntity = {
      ...storedUser,
      ...updateUserDto,
    };

    (userRepository.findById as jest.Mock).mockResolvedValue(storedUser);
    (mergeUserDataUseCase.execute as jest.Mock).mockResolvedValue(mergedUser);

    await useCase.execute(userId, updateUserDto);

    expect(userRepository.findById).toHaveBeenCalledWith(userId);
    expect(mergeUserDataUseCase.execute).toHaveBeenCalledWith(storedUser, updateUserDto);
    expect(userRepository.save).toHaveBeenCalledWith(mergedUser);
  });
});
