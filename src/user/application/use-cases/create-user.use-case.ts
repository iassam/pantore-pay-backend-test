import { Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "../entities";
import { CreateUserDto } from "../dtos";
import { UserRepositoryInterface } from "../interfaces";
import { encPassword } from "../../shared/helpers";

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly usersRepository: UserRepositoryInterface,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.usersRepository.save({
      ...createUserDto, 
      password: await encPassword(createUserDto.password)
    });
  }
}
