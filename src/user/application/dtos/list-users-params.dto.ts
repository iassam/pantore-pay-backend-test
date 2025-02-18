import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { UserRole } from "../../shared/enums";

export class ListUsersParamsDto {
  @ApiProperty({
    type: String,
    description: "Email",
    example: "test@email.com",
    required: false,
  })
  email?: string;

  @ApiProperty({
    type: String,
    description: "Name of user",
    example: "John",
    required: false,
  })
  name?: string;

  @ApiProperty({
    type: String,
    description: "Role of user",
    enum: UserRole,
    example: UserRole.CLIENT,
    required: false,
  })
  role?: UserRole;
}
