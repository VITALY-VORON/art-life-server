import { Module } from "@nestjs/common";
import { UserSettingsController } from "./settings.controller";
import { UserSettingsService } from "./settings.service";
import { PrismaService } from "src/prisma/prisma.service";
import { ImageService } from "src/image/image.service";
import { ImageModule } from "src/image/image.module";

@Module({
  imports: [ImageModule],
  controllers: [UserSettingsController],
  providers: [UserSettingsService, PrismaService, ImageService],
  exports: [UserSettingsService],
})
export class SettingsModule {}
