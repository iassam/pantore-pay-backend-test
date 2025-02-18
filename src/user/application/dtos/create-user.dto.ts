import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { UserRole } from "src/user/shared/enums";

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    type: String,
    description: "Email",
    example: "test@email.com",
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: "Password",
    example: "password",
    required: true,
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: "Name of user",
    example: "John",
    required: true,
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: "Role of user",
    enum: UserRole,
    example: UserRole.CLIENT,
    required: true,
  })
  role: UserRole;
}
