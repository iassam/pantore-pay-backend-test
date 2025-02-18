import { Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "../entities";
import { UserRepositoryInterface } from "../interfaces";
import { ListUsersParamsDto } from "../dtos";

@Injectable()
export class ListUserUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly usersRepository: UserRepositoryInterface,
  ) {}

  async execute(listUsersParamsDto: ListUsersParamsDto): Promise<UserEntity[]> {
    return await this.usersRepository.list(listUsersParamsDto);
  }
}
