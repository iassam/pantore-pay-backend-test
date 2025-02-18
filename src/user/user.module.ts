import { Module } from '@nestjs/common';
import { DatabaseUserRepository } from './infrastructure/repositories';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './infrastructure/models';
import { CreateUserUseCase } from './application/use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [
    DatabaseUserRepository,
    CreateUserUseCase,
    {
      provide: 'UserRepositoryInterface',
      useClass: DatabaseUserRepository,
    },
  ],
})
export class UserModule {}
