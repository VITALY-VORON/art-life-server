import { Module } from "@nestjs/common";
import { SettingsModule } from "./settings/settings.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { ImageModule } from "./image/image.module";

@Module({
  imports: [
    AuthModule,
    SettingsModule,
    PrismaModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ImageModule,
  ],
})
export class AppModule {}
