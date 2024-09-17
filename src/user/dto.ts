import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto
  implements Omit<User, "appearanceSettingsId" | "appThemeId" | "id">
{
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  @MinLength(2)
  name: string;
  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;
}
