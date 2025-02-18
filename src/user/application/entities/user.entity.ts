import { Exclude, Expose } from "class-transformer";
import { UserRole } from "../../shared/enums";

/**
 * Entity representing a user.
 */
export class UserEntity {
  /**
   * The ID of the user.
   */
  @Expose()
  id?: string;

  /**
   * The name of the user.
   */
  @Expose()
  name: string;

  /**
   * The email of the user.
   */
  @Expose()
  email: string;

  /**
   * The password of the user.
   */
  @Exclude()
  password: string;

  /**
   * The role of the user.
   */
  @Expose()
  role: UserRole;

  /**
   * The date and time when the user was created.
   */
  @Expose()
  created_at?: Date;

  /**
   * The date and time when the user was last updated.
   */
  @Expose()
  updated_at?: Date;
}