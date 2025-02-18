import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { UserModel } from "../models";
import { UserRepositoryInterface } from "../../application/interfaces";
import { UserEntity } from "../../application/entities";

@Injectable()
export class DatabaseUserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(UserModel)
    private readonly usersRepository: Repository<UserModel>,
  ) {}

  async save(userEntity: UserEntity): Promise<UserEntity> {
    const storedUser = await this.usersRepository.save(userEntity);

    return plainToClass(UserEntity, storedUser);
  }
}
