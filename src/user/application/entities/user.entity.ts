import { Exclude, Expose } from "class-transformer";
import { UserRole } from "../../shared/enums";

export class UserEntity {
  @Expose()
  id?: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  role: UserRole;

  @Expose()
  created_at?: Date;

  @Expose()
  updated_at?: Date;
}