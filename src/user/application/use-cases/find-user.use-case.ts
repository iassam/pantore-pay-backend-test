import { Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "../entities";
import { UserRepositoryInterface } from "../interfaces";

@Injectable()
export class FindUserUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly usersRepository: UserRepositoryInterface,
  ) {}

  async execute(userId: string): Promise<UserEntity> {
    return await this.usersRepository.findById(userId);
  }
}
