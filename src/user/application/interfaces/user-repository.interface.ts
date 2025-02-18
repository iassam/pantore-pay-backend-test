import { UserEntity } from "../entities";

export interface UserRepositoryInterface {
    save(user: UserEntity): Promise<UserEntity>;
}