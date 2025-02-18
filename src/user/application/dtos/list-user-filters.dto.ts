import { IsEnum, IsString } from "class-validator";
import { UserRole } from "src/user/shared/enums";

export class ListUserFilterDto {
  @IsString()
  email?: string;

  @IsString()
  name?: string;

  @IsEnum({enum: UserRole})
  role?: UserRole;
}
