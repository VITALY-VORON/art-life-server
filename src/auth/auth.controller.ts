import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBody, ApiTags, OmitType } from "@nestjs/swagger";
import { CreateUserDto } from "src/user/dto";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiBody({
    type: CreateUserDto,
  })
  async register(
    @Body() data: { email: string; password: string; name: string },
  ) {
    return await this.authService.register(data);
  }

  @Post("login")
  @ApiBody({
    type: OmitType(CreateUserDto, ["name"]),
  })
  async login(@Body() data: { email: string; password: string }) {
    return await this.authService.login(data);
  }
}
