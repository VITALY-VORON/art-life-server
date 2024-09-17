import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        appearanceSettings: true,
        appTheme: true,
        bottomPanelSettings: {
          include: {
            buttons: true,
          },
        },
        pages: {
          include: {
            blocks: true,
          },
        },
      },
    });

    delete user["password"];
    return user;
  }
}
