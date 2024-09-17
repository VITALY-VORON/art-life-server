import { Controller, Put, Body, Param } from "@nestjs/common";
import { UserSettingsService } from "./settings.service";
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { UpdateUserSettingsDto } from "./dto";

@Controller("user-settings")
@ApiTags("Settings")
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @Put(":userId")
  @ApiParam({ name: "userId" })
  @ApiBody({
    type: UpdateUserSettingsDto,
  })
  async updateUserSettings(
    @Param("userId") userId: string,
    @Body() data: any,
  ): Promise<void> {
    await this.userSettingsService.updateUserSettings(userId, data);
  }
}
