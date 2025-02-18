import { Module } from '@nestjs/common';
import { DatabaseUserRepository } from './infrastructure/repositories';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './infrastructure/models';
import { 
  CreateUserUseCase,
  FindUserUseCase,
  ListUserUseCase,
  MergeUserDataUseCase,
  UpdateUserUseCase
} from './application/use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [
    DatabaseUserRepository,
    CreateUserUseCase,
    FindUserUseCase,
    ListUserUseCase,
    UpdateUserUseCase,
    MergeUserDataUseCase,
    {
      provide: 'UserRepositoryInterface',
      useClass: DatabaseUserRepository,
    },
  ],
})
export class UserModule {}
